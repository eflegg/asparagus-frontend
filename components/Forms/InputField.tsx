import styled from "styled-components";
import theme from "../../components/Global/Theme";
import React from "react";

type InputProps = {
  label: string;
  placeholder: string;
  onBlur: any;
  className?: string;
  type: string;
  onChangeHandler: any;
  name: string;
  value: string;
  isRequired: boolean;
  id: string;
};
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colours.soil};
  font-family: ${theme.type.body};
  font-size: 2.4rem;
input {
  height: 35px;
}
  input,
  textarea {
    padding-left: 10px;
    background: white
    &:focus {
      border: 3px dotted ${theme.colours.soil};
    }
  }

  label {
    color: ${theme.colours.soil};
    font-weight: 300;
  }
`;

const InputField: React.FC<InputProps> = ({
  label,
  placeholder,
  className,
  type,
  onChangeHandler,
  value,
  isRequired,
  name,
  onBlur,
  id,
}) => {
  return (
    <InputContainer className={` ${className ? className : ""}`}>
      <label htmlFor={id} className="input--default">
        {label}
        {isRequired ? "*" : null}
      </label>
      {type === "text" ? (
        <>
          <input
            type="text"
            name={name}
            id={id}
            onChange={onChangeHandler}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
          />
        </>
      ) : (
        <>
          <textarea
            name={name}
            placeholder={placeholder}
            onChange={onChangeHandler}
            value={value}
          />
        </>
      )}
    </InputContainer>
  );
};

export default InputField;
