import React from 'react';
import AutosizeInput from 'react-input-autosize';
import TagsInput from 'react-tagsinput';
import './TagsInputField.css'

const TagsInputField = ({ placeholder, ...props }) => (
  <div>
      <TagsInput
          onlyUnique
          inputProps={{ placeholder }}
          className="form-control p-0"
          renderInput={(props) => {
              let { onChange, value, addTag, ...rest } = props;
              return (
                  <AutosizeInput
                      onChange={onChange}
                      value={value}
                      {...rest}
                  />
              );
          }}
          {...props}
      />
  </div>
);


export default TagsInputField;
