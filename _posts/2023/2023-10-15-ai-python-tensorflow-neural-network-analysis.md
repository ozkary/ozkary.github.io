---
title: "AI with Python and Tensorflow - Convolutional Neural Networks Analysis"
excerpt: "CNNs employ convolution operations, primarily used for processing images. The network initiates the analysis by applying filters that aim to extract valuable image features using various convolutional kernels. "
last_modified_at: 2023-10-15T13:00:00
header:
  teaser: "../assets/2023/ozkary-ai-engineering-neural-network-analysis.png"
  teaserAlt: "Ozkary AI Engineering Convolutional Neural Networks"
tags:   
  - AI  
  - Tensorflow
  - Python    
  - neural-networks  
toc: true
---

# AI with Python and Tensorflow - Convolutional Neural Networks

[![Neural Network Model Analysis - Youtube](https://www.ozkary.dev/assets/2023/ozkary-ai-engineering-neural-network-analysis.png)](https://youtu.be/OJjZGb7fmOo?si=TRxK13hoSJWdTy9r "Neural Network Model Analysis")


## Convolutional neural network (CNN)  

Convolutional Neural Networks (CNNs) have revolutionized the field of computer vision and image processing. These specialized deep learning models are inspired by the human visual system and excel at tasks like image classification, object detection, and facial recognition. 

CNNs employ convolution operations, primarily used for processing images. The network initiates the analysis by applying filters that aim to extract valuable image features using various convolutional kernels. Similar to other weights in the neural network, these filters can be enhanced by adjusting their kernels based on the output error. After this, the resultant images undergo pooling, followed by pixel-wise input to a standard neural network in a process known as flattening.

![AI convolutional neural network - ozkary](https://www.ozkary.dev/assets/2023/ozkary-ai-engineering-neural-network-analysis.png "AI Traffic Signs Classifier neural networks")

### Model 1

```
Input (IMG_WIDTH, IMG_HEIGHT, 3)
|
Conv2D (32 filters, 3x3 kernel, ReLU)
|
MaxPooling2D (2x2 pool size)
|
Flatten
|
Dense (128 nodes, ReLU)
|
Dropout (50%)
|
Dense (NUM_CATEGORIES, softmax)
|
Output (NUM_CATEGORIES)
```

1. Input Layer (Conv2D):
   - Type: Convolutional Layer (2D)
   - Number of Filters: 32
   - Filter Size: (3, 3)
   - Activation Function: Rectified Linear Unit (ReLU)
   - Input Shape: (IMG_WIDTH, IMG_HEIGHT, 3) where 3 represents the color channels (RGB).

2. Pooling Layer (MaxPooling2D):
   - Type: Max Pooling Layer (2D)
   - Pool Size: (2, 2)
   - Purpose: Reduces the spatial dimensions by taking the maximum value from each group of 2x2 pixels.

3. Flatten Layer (Flatten):
   - Type: Flattening Layer
   - Purpose: Converts the multidimensional input into a 1D array to feed into the Dense layer.

4. Dense Hidden Layer (Dense):
   - Number of Neurons: 128
   - Activation Function: ReLU
   - Purpose: Learns and represents complex patterns in the data.

5. Dropout Layer (Dropout):
   - Rate: 0.5
   - Purpose: Helps prevent overfitting by randomly setting 50% of the inputs to zero during training.

6. Output Layer (Dense):
   - Number of Neurons: NUM_CATEGORIES (Number of categories for traffic signs)
   - Activation Function: Softmax
   - Purpose: Produces probabilities for each category, summing to 1, indicating the likelihood of the input image belonging to each category.

```python

layers = tf.keras.layers

# Create a convolutional neural network
model =  tf.keras.models.Sequential([
    
    # Convolutional layer. Learn 32 filters using a 3x3 kernel
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(30, 30, 3)),
    
    # Max-pooling layer, reduces the spatial dimensions by taking the maximum value from each group of 2x2 pixels
    layers.MaxPooling2D((2, 2)),
            
    # Converts the multidimensional input into a 1D array to feed into the Dense layer
    layers.Flatten(),
    
    # Dense Hidden Layer with 128 nodes and relu activation function to learns and represent complex patterns in the data
    layers.Dense(128, activation='relu'),
    
    # Dropout layer to prevent overfitting by randomly setting 50% of the inputs to 0 at each update during training
    layers.Dropout(0.5),
    
    # Output layer with NUM_CATEGORIES outputs and softmax activation function to return probability-like results
    layers.Dense(NUM_CATEGORIES, activation='softmax')
])

```

### Model 2

```
Input (IMG_WIDTH, IMG_HEIGHT, 3)
|
Conv2D (32 filters, 3x3 kernel, ReLU)
|
MaxPooling2D (2x2 pool size)
|
Conv2D (64 filters, 3x3 kernel, ReLU)
|
MaxPooling2D (2x2 pool size)
|
Flatten
|
Dense (128 nodes, ReLU)
|
Dropout (50%)
|
Dense (NUM_CATEGORIES, softmax)
|
Output (NUM_CATEGORIES)
```

1. Input Layer (Conv2D):
   - Type: Convolutional Layer (2D)
   - Number of Filters: 32
   - Filter Size: (3, 3)
   - Activation Function: Rectified Linear Unit (ReLU)
   - Input Shape: (IMG_WIDTH, IMG_HEIGHT, 3) where 3 represents the color channels (RGB).

2. Pooling Layer (MaxPooling2D):
   - Type: Max Pooling Layer (2D)
   - Pool Size: (2, 2)
   - Purpose: Reduces the spatial dimensions by taking the maximum value from each group of 2x2 pixels.

3. Convolutional Layer (Conv2D):
   - Number of Filters: 64
   - Filter Size: (3, 3)
   - Activation Function: ReLU
   - Purpose: Extracts higher-level features from the input.

4. Pooling Layer (MaxPooling2D):
   - Pool Size: (2, 2)
   - Purpose: Further reduces spatial dimensions.

5. Flatten Layer (Flatten):
   - Type: Flattening Layer
   - Purpose: Converts the multidimensional input into a 1D array to feed into the Dense layer.

6. Dense Hidden Layer (Dense):
   - Number of Neurons: 128
   - Activation Function: ReLU
   - Purpose: Learns and represents complex patterns in the data.

7. Dropout Layer (Dropout):
   - Rate: 0.5
   - Purpose: Helps prevent overfitting by randomly setting 50% of the inputs to zero during training.

8. Output Layer (Dense):
   - Number of Neurons: NUM_CATEGORIES (Number of categories for traffic signs)
   - Activation Function: Softmax
   - Purpose: Produces probabilities for each category, summing to 1, indicating the likelihood of the input image belonging to each category.

```python

layers = tf.keras.layers

    # Create a convolutional neural network
    model = tf.keras.models.Sequential([
        
        # Convolutional layer. Learn 32 filters using a 3x3 kernel
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(30, 30, 3)),
        
        # Max-pooling layer, reduces the spatial dimensions by taking the maximum value from each group of 2x2 pixels
        layers.MaxPooling2D((2, 2)),
        
        # Convolutional layer. Learn 64 filters using a 3x3 kernel to extracts higher-level features from the input
        layers.Conv2D(64, (3, 3), activation='relu'),
        
        # Max-pooling layer, using 2x2 pool size reduces spatial dimensions
        layers.MaxPooling2D((2, 2)),
        
        # Converts the multidimensional input into a 1D array to feed into the Dense layer
        layers.Flatten(),
        
        # Dense Hidden Layer with 128 nodes and relu activation function to learns and represent complex patterns in the data
        layers.Dense(128, activation='relu'),
        
        # Dropout layer to prevent overfitting by randomly setting 50% of the inputs to 0 at each update during training
        layers.Dropout(0.5),
        
        # Output layer with NUM_CATEGORIES outputs and softmax activation function to return probability-like results
        layers.Dense(NUM_CATEGORIES, activation='softmax')
    ])

```

The architecture follows a typical CNN pattern: alternating Convolutional and MaxPooling layers to extract features and reduce spatial dimensions, followed by Flattening and Dense layers for classification.

Feel free to adjust the number of filters, filter sizes, layer types, or other hyperparameters based on your specific problem and dataset. Experimentation is key to finding the best architecture for your task.

### Model 1 Results
```bash
Images and Labels loaded 26640, 26640
Epoch 1/10
500/500 [==============================] - 7s 12ms/step - loss: 4.9111 - accuracy: 0.0545   
Epoch 2/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5918 - accuracy: 0.0555
Epoch 3/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5411 - accuracy: 0.0565
Epoch 4/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5190 - accuracy: 0.0577
Epoch 5/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5088 - accuracy: 0.0565
Epoch 6/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5041 - accuracy: 0.0577
Epoch 7/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5019 - accuracy: 0.0577
Epoch 8/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5008 - accuracy: 0.0577
Epoch 9/10
500/500 [==============================] - 6s 12ms/step - loss: 3.5002 - accuracy: 0.0577
Epoch 10/10
500/500 [==============================] - 6s 12ms/step - loss: 3.4999 - accuracy: 0.0577
333/333 - 1s - loss: 3.4964 - accuracy: 0.0541 - 1s/epoch - 4ms/step
```

### Model 2 Results

```bash

Images and Labels loaded 26640, 26640
Epoch 1/10
500/500 [==============================] - 9s 15ms/step - loss: 4.0071 - accuracy: 0.1315
Epoch 2/10
500/500 [==============================] - 7s 14ms/step - loss: 2.0718 - accuracy: 0.3963
Epoch 3/10
500/500 [==============================] - 7s 15ms/step - loss: 1.4216 - accuracy: 0.5529
Epoch 4/10
500/500 [==============================] - 7s 14ms/step - loss: 1.0891 - accuracy: 0.6546
Epoch 5/10
500/500 [==============================] - 7s 14ms/step - loss: 0.8440 - accuracy: 0.7320
Epoch 6/10
500/500 [==============================] - 7s 14ms/step - loss: 0.6838 - accuracy: 0.7862
Epoch 7/10
500/500 [==============================] - 7s 14ms/step - loss: 0.5754 - accuracy: 0.8184
Epoch 8/10
500/500 [==============================] - 7s 14ms/step - loss: 0.5033 - accuracy: 0.8420
Epoch 9/10
500/500 [==============================] - 7s 14ms/step - loss: 0.4171 - accuracy: 0.8729
Epoch 10/10
500/500 [==============================] - 7s 15ms/step - loss: 0.3787 - accuracy: 0.8851
333/333 - 2s - loss: 0.1354 - accuracy: 0.9655 - 2s/epoch - 6ms/step
Model saved to cnn_model2.keras.

```

## Summary

This is a summary of the CNN model experiments:

Model 1 had a loss of `3.4964 and an accuracy of 0.0541`. This model had a simple architecture with few layers and filters, which may have limited its ability to learn complex features in the input images.

Model 2 had a loss of `0.1354 and an accuracy of 0.9655`. This model had a more complex architecture with additional hidden layers, including a convolutional layer with 64 filters and an additional max pooling (2x2) layer. The addition of these layers likely helped the model learn more complex features in the input images, leading to a significant improvement in accuracy.

In particular, the addition of more convolutional layers with more filters can help the model learn more complex features in the input images, as each filter learns to detect a different pattern or feature in the input. However, it is important to balance the number of filters with the size of the input images and the complexity of the problem, as using too many filters can lead to overfitting and poor generalization to new data.

Overall, the results suggest that increasing the complexity of the model by adding more hidden layers can help improve its accuracy, but it is important to balance the complexity of the model with the size of the input images and the complexity of the problem to avoid overfitting.

### Learning rate

- A learning rate of .001 (default) provided optimal results - `loss: 0.1354 - accuracy: 0.9655`
- A learning rate of .01 lower the accuracy and increase the loss  ` loss: 3.4858 - accuracy: 0.0594`

A learning rate of 0.01 is too high for our specific problem and dataset, which can cause the model to overshoot the optimal solution and fail to converge.


```python

model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.01),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

```

Thanks for reading.

Send question or comment at Twitter @ozkary

👍 Originally published by [ozkary.com](https://www.ozkary.com)