local pagebreak = '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'
function Header (el)
  if el.level == 1 then

    -- Check if the page number is odd or even
    local isOddPage = (tonumber(el.identifier) or 0) % 2 == 1

    -- Create a new paragraph for the footer
    local footerContent
    if isOddPage then
      footerContent = pandoc.Span(el.content)
    else
      -- Access the document metadata to get the author
      local author = "Oscar D. Garcia - ozkary"
      footerContent = pandoc.Str(author)
    end

    local footer = pandoc.Para({ footerContent })


    -- return both the page break and the header as a list
    return { pandoc.RawBlock ('openxml', pagebreak), el }
  end
end
-- Example Meta function to handle document metadata
function Meta(meta)
  -- Store the metadata globally for access in the Header function
  pandoc.Meta = meta
end
