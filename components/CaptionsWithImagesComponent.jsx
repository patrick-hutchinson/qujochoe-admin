import React from 'react';
import { Stack, TextInput, Card, Text } from '@sanity/ui';
import { useFormValue, set, unset } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder({
  projectId: 'h8ta33uq', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your Sanity dataset
});

const CaptionsWithImagesComponent = (props) => {
  const { onChange } = props;
  const value = props.value || []; // Default to an empty array if value is undefined
  const images = useFormValue(['gallery']); // Fetch images from gallery

  // Helper function to get the image URL from _ref
  const getImageUrl = (image) => {
    if (image?.asset?._ref) {
      return builder.image(image.asset).url(); // Generate the URL using the builder
    }
    return null;
  };

  // When a caption is updated, directly update the array
  const handleCaptionChange = (index, caption) => {
    const newValue = [...value]; // Copy the existing value (array of captions)
    newValue[index] = caption;  // Update the caption at the specified index

    onChange(set(newValue)); // Pass the updated array back to `onChange`
  };

  return (
    <Stack space={3}>
      {images?.map((image, index) => (
        <Card key={index} padding={3} radius={2} shadow={1} style={{ display: 'flex', alignItems: 'center' }}>
          <Text size={1} style={{ marginRight: '1rem' }}>#{index + 1}</Text>
          {image?.asset?._ref ? (
            <div style={{ width: 60, height: 60, marginRight: '1rem' }}>
              <img
                src={getImageUrl(image)} // Generate and use the image URL
                alt={`# ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <Text size={1} style={{ marginRight: '1rem' }}>No Image</Text>
          )}
          <Text size={1} style={{ marginRight: '1rem' }}>Caption:</Text>
          <TextInput
            size={40}
            placeholder={`Caption for image ${index + 1}`}
            value={value[index] || ''} // Safely access the value
            onChange={(event) => handleCaptionChange(index, event.target.value)} // Call the handler with updated caption
          />
        </Card>
      ))}
    </Stack>
  );
};

export default CaptionsWithImagesComponent;
