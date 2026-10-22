/**
 * ============================================================================
 * GOOGLE APPS SCRIPT: Dynamic Markdown to Google Slides Generator
 * ============================================================================
 * 
 * DESCRIPTION:
 * Automatically parses a slide specification Markdown file uploaded to Google
 * Drive and generates a styled Google Slides presentation with:
 *   - Dark theme styling (Midnight Navy #0B1120, Surface #1E293B, Cyan #38BDF8)
 *   - Minimalist visible slide faces with structured card containers
 *   - ElevenLabs-optimized narration scripts written to Presenter Notes
 * 
 * INSTRUCTIONS:
 * 1. Upload your slide markdown file (e.g. beyond-the-prompt-*.md) to Google Drive.
 * 2. Copy the file's ID or shareable link and paste it into MARKDOWN_FILE_ID_OR_URL below.
 * 3. Open https://script.new in your browser (signed in as ozkary@gmail.com).
 * 4. Paste this entire script into the editor.
 * 5. Click "Run" (function: generateSlidesFromMarkdown).
 * 6. Review the Execution Log for the direct URL to your new Google Slides deck.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------

// Paste your Google Drive Markdown file ID or complete sharing URL here:
const MARKDOWN_FILE_ID_OR_URL = "PASTE_YOUR_MARKDOWN_DRIVE_FILE_ID_OR_URL_HERE";

// Optional: Template Presentation ID or URL (from spec-slides.md)
// If left blank or if inaccessible, the script builds from the dark theme blueprint.
const TEMPLATE_ID_OR_URL = "1Q_2Xy7b-Fax-zS3K3h_3ZQda9L94GuWw1KZg7uw3WUs";

// Theme Palette Tokens
const THEME = {
  CANVAS_BG: "#0B1120",       // Midnight Navy background
  SURFACE_CARD: "#1E293B",    // Slate container background
  BORDER_CARD: "#334155",     // Border stroke for containers
  ACCENT_CYAN: "#38BDF8",     // Vibrant Cyan for titles & primary tokens
  ACCENT_BLUE: "#2563EB",     // Cobalt Blue accent
  TEXT_WHITE: "#F8FAFC",      // High-contrast pure white text
  TEXT_MUTED: "#94A3B8",      // Secondary / Slate body text
  BADGE_GREEN: "#10B981",     // Highlight Emerald
  BADGE_AMBER: "#F59E0B"      // Highlight Warning Amber
};

// ----------------------------------------------------------------------------
// MAIN EXECUTION FUNCTION
// ----------------------------------------------------------------------------

function generateSlidesFromMarkdown() {
  Logger.log("🚀 Starting Markdown to Google Slides generation...");

  const mdFileId = extractGoogleDriveId(MARKDOWN_FILE_ID_OR_URL);
  if (!mdFileId || mdFileId.includes("PASTE_YOUR_")) {
    throw new Error(
      "❌ Please set MARKDOWN_FILE_ID_OR_URL with a valid Google Drive File ID or sharing URL."
    );
  }

  // 1. Fetch Markdown file content from Google Drive
  Logger.log("📥 Fetching Markdown file from Google Drive (ID: " + mdFileId + ")...");
  const mdFile = DriveApp.getFileById(mdFileId);
  const mdContent = mdFile.getBlob().getDataAsString();
  Logger.log("📄 Loaded file: " + mdFile.getName() + " (" + mdContent.length + " characters)");

  // 2. Parse Markdown into structured slide data
  const parsedDeck = parseMarkdownToSlides(mdContent);
  Logger.log("🔍 Successfully parsed " + parsedDeck.slides.length + " slides.");

  // 3. Initialize Presentation (Clone Template or Create New)
  const presentation = initPresentation(parsedDeck.title);

  // 4. Build Slides
  Logger.log("🎨 Building slides with theme and presenter notes...");
  parsedDeck.slides.forEach((slideData, index) => {
    buildSlide(presentation, slideData, index + 1, parsedDeck.slides.length);
  });

  // 5. Finalize and log link
  const presentationUrl = presentation.getUrl();
  Logger.log("============================================================");
  Logger.log("✅ SUCCESS! Your Google Slides deck is ready:");
  Logger.log("👉 " + presentationUrl);
  Logger.log("============================================================");

  return presentationUrl;
}

// ----------------------------------------------------------------------------
// PRESENTATION INITIALIZATION
// ----------------------------------------------------------------------------

function initPresentation(title) {
  const templateId = extractGoogleDriveId(TEMPLATE_ID_OR_URL);
  let presentation = null;

  if (templateId) {
    try {
      Logger.log("📋 Attempting to copy presentation template (ID: " + templateId + ")...");
      const templateFile = DriveApp.getFileById(templateId);
      const newFile = templateFile.makeCopy(title);
      presentation = SlidesApp.openById(newFile.getId());
      
      // Remove any existing placeholder slides from template
      const existingSlides = presentation.getSlides();
      for (let i = existingSlides.length - 1; i >= 0; i--) {
        existingSlides[i].remove();
      }
      Logger.log("✅ Template cloned and cleared.");
    } catch (e) {
      Logger.log("⚠️ Could not clone template directly (" + e.message + "). Creating new presentation with theme palette...");
    }
  }

  if (!presentation) {
    presentation = SlidesApp.create(title);
    // Remove the default blank title slide
    const initialSlides = presentation.getSlides();
    if (initialSlides.length > 0) {
      initialSlides[0].remove();
    }
  }

  return presentation;
}

// ----------------------------------------------------------------------------
// SLIDE BUILDER
// ----------------------------------------------------------------------------

function buildSlide(presentation, slideData, slideIndex, totalSlides) {
  Logger.log("🔨 Constructing Slide " + slideIndex + ": " + slideData.title);

  // Create slide with blank layout
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Apply dark canvas background
  slide.getBackground().setSolidFill(THEME.CANVAS_BG);

  // Dimensions (Standard 16:9 in Google Slides: 720 x 405 pt)
  const pageWidth = 720;
  const pageHeight = 405;

  // Header Banner / Category Tag
  const headerBox = slide.insertTextBox(
    "SPECIFICATION-DRIVEN DESIGN  •  SLIDE " + slideIndex + " OF " + totalSlides,
    40,
    22,
    640,
    20
  );
  headerBox.getText().getTextStyle()
    .setFontFamily("Roboto")
    .setFontSize(10)
    .setForegroundColor(THEME.ACCENT_CYAN)
    .setBold(true);

  // Slide Title
  const titleBox = slide.insertTextBox(slideData.title, 40, 42, 640, 45);
  titleBox.getText().getTextStyle()
    .setFontFamily("Inter")
    .setFontSize(22)
    .setForegroundColor(THEME.TEXT_WHITE)
    .setBold(true);

  // Main Card Container (Surface Background)
  const cardLeft = 40;
  const cardTop = 95;
  const cardWidth = 640;
  const cardHeight = 275;

  const card = slide.insertShape(
    SlidesApp.ShapeType.ROUND_RECTANGLE,
    cardLeft,
    cardTop,
    cardWidth,
    cardHeight
  );
  card.getFill().setSolidFill(THEME.SURFACE_CARD);
  try {
    card.getBorder().setWeight(1);
    card.getBorder().getLineFill().setSolidFill(THEME.BORDER_CARD);
  } catch (e) {
    // Graceful fallback if border line fill is unsupported
  }

  // Format Slide Face Content (Bullets / Text)
  let contentText = "";
  if (slideData.subtitle) {
    contentText += slideData.subtitle + "\n\n";
  }

  if (slideData.bullets && slideData.bullets.length > 0) {
    contentText += slideData.bullets.join("\n\n");
  } else if (slideData.body) {
    contentText += slideData.body;
  }

  const contentBox = slide.insertTextBox(
    contentText,
    cardLeft + 25,
    cardTop + 20,
    cardWidth - 50,
    cardHeight - 40
  );

  const textRange = contentBox.getText();
  textRange.getTextStyle()
    .setFontFamily("Roboto")
    .setFontSize(14)
    .setForegroundColor(THEME.TEXT_MUTED);

  // Highlight bold sections and headings inside content box
  try {
    highlightSlideBullets(textRange);
  } catch (e) {
    // Non-blocking formatting fallback
  }

  // 🎙️ Presenter Notes (Narration Script for ElevenLabs)
  if (slideData.notes) {
    const notesPage = slide.getNotesPage();
    const notesShape = notesPage.getSpeakerNotesShape();
    notesShape.getText().setText(slideData.notes);
  }
}

/**
 * Highlights bullet headers and tokens in white/cyan
 */
function highlightSlideBullets(textRange) {
  const fullText = textRange.asString();
  const lines = fullText.split("\n");
  let charCursor = 0;

  lines.forEach(line => {
    if (line.includes("–") || line.includes("-") || line.includes("•")) {
      // Highlight the concept token before the dash/colon
      const delimiterIndex = line.search(/–|-|:/);
      if (delimiterIndex > 0) {
        const leadRange = textRange.getRange(charCursor, charCursor + delimiterIndex);
        leadRange.getTextStyle()
          .setForegroundColor(THEME.TEXT_WHITE)
          .setBold(true);
      }
    }
    charCursor += line.length + 1;
  });
}

// ----------------------------------------------------------------------------
// MARKDOWN PARSER
// ----------------------------------------------------------------------------

function parseMarkdownToSlides(md) {
  const lines = md.split(/\r?\n/);
  let presentationTitle = "Beyond the Prompt: Specification-Driven Design";
  const slides = [];

  // Extract deck title from top
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const line = lines[i].trim();
    if (line.startsWith("# Slide Deck Specification:")) {
      presentationTitle = line.replace("# Slide Deck Specification:", "").trim();
      break;
    } else if (line.startsWith("# ") && !line.includes("Visible Slide Face")) {
      presentationTitle = line.replace("# ", "").trim();
      break;
    }
  }

  // Split content by slide delimiters (## Slide X: ...)
  const slideChunks = md.split(/(?=^## Slide \d+:)/gm);

  slideChunks.forEach(chunk => {
    const trimmed = chunk.trim();
    if (!trimmed.startsWith("## Slide")) return;

    const slideData = parseSingleSlideChunk(trimmed);
    if (slideData) {
      slides.push(slideData);
    }
  });

  return {
    title: presentationTitle,
    slides: slides
  };
}

function parseSingleSlideChunk(chunk) {
  const lines = chunk.split(/\r?\n/);
  let title = "Slide";
  let subtitle = "";
  const bullets = [];
  let notes = "";
  let inVisibleFace = false;
  let inNotes = false;

  // Extract slide title from header
  const headerMatch = lines[0].match(/## Slide \d+:\s*(.+)/);
  if (headerMatch) {
    title = headerMatch[1].trim();
  }

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (line.startsWith("### 📺 Visible Slide Face")) {
      inVisibleFace = true;
      inNotes = false;
      continue;
    }

    if (line.startsWith("### 🎙️ Presenter Notes") || line.startsWith("## Presenter Notes")) {
      inVisibleFace = false;
      inNotes = true;
      continue;
    }

    if (line.startsWith("---") || line.startsWith("<!-- SLIDE")) {
      inVisibleFace = false;
      inNotes = false;
      continue;
    }

    // Capture visible face content
    if (inVisibleFace) {
      if (line.startsWith("# ") && !title.includes(":")) {
        title = line.replace("# ", "").trim();
      } else if (line.startsWith("### ")) {
        subtitle = line.replace("### ", "").trim();
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        bullets.push("•  " + line.substring(2).trim());
      }
    }

    // Capture presenter notes
    if (inNotes) {
      if (line.length > 0) {
        notes += (notes.length > 0 ? " " : "") + line;
      }
    }
  }

  return {
    title: title,
    subtitle: subtitle,
    bullets: bullets,
    notes: notes
  };
}

// ----------------------------------------------------------------------------
// HELPER: EXTRACT GOOGLE DRIVE / DOCS ID
// ----------------------------------------------------------------------------

function extractGoogleDriveId(input) {
  if (!input) return "";
  const str = input.trim();

  // Pattern: /d/{ID}/ or id={ID}
  const match = str.match(/\/d\/([a-zA-Z0-9_-]+)/) || str.match(/id=([a-zA-Z0-9_-]+)/);
  if (match) {
    return match[1];
  }

  // If input is directly an alphanumeric ID (25+ characters)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(str)) {
    return str;
  }

  return str;
}
