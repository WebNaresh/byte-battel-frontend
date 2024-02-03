import { ErrorMessage } from "@hookform/error-message";
import {
  Autocomplete,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { default as React } from "react";
import { Controller } from "react-hook-form";
// import Autocomplete from "react-google-autocomplete";

const AuthInputFiled = ({
  label,
  name,
  icon: Icon,
  type,
  errors,
  error,
  control,
  readOnly = false,
  placeholder,
  options,
  disabled,
}) => {
  if (type === "select") {
    return (
      <>
        <div className=" w-full ">
          <Controller
            control={control}
            name={name}
            id={name}
            render={({ field }) => (
              <>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                  size="small"
                  fullWidth
                  //   labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
                  label={"label"}
                  {...field}
                  className="!border-none"
                  placeholder={label}
                >
                  <MenuItem value={"Provider"}>Provider</MenuItem>
                  <MenuItem value={"Consumer"}>Consumer</MenuItem>
                </Select>
              </>
            )}
          />
          <div className="h-4 !mb-1">
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-sm text-red-500">{message}</p>
              )}
            />
          </div>
        </div>
      </>
    );
  }

  if (type === "checkbox") {
    return (
      <div className=" w-full ">
        <Controller
          control={control}
          name={name}
          id={name}
          render={({ field }) => (
            <div
              className={`${
                readOnly && "bg-[ghostwhite]"
              } flex rounded-md px-2 bg-white py-[6px] gap-2`}
            >
              <Icon className="text-gray-700" />
              <input
                checked={field.value}
                type={type}
                readOnly={readOnly}
                id={name}
                placeholder={placeholder}
                className={`${
                  readOnly && "bg-[ghostwhite]"
                } border-none bg-white outline-none px-2`}
                {...field}
                disabled={disabled}
                formNoValidate
              />
              <label
                htmlFor={name}
                className={`${
                  error && "text-red-500"
                } font-semibold text-gray-500 text-md`}
              >
                {label}
              </label>
            </div>
          )}
        />
        <div className="h-4 !mb-1">
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-sm text-red-500">{message}</p>
            )}
          />
        </div>
      </div>
    );
  }
  if (type === "autocomplete") {
    return (
      <>
        <div className=" w-full ">
          <Controller
            control={control}
            name={name}
            id={name}
            render={({ field }) => {
              return (
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={field.value}
                  defaultValue={field.value}
                  freeSolo
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={label}
                      placeholder={placeholder}
                      size="small"
                    />
                  )}
                />
              );
            }}
          />
          <div className="h-4 !mb-1">
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-sm text-red-500">{message}</p>
              )}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className=" w-full ">
      <label
        htmlFor={name}
        className={`${
          error && "text-red-500"
        } font-semibold text-gray-500 text-md`}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        id={name}
        render={({ field }) => (
          <>
            <div
              className={`${
                readOnly && "bg-[ghostwhite]"
              } flex rounded-md px-2 border-gray-200 border-[.5px] bg-white py-[6px]`}
            >
              <Icon className="text-gray-700" />
              <input
                type={type}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`${
                  readOnly && "bg-[ghostwhite]"
                } border-none bg-white w-full outline-none px-2`}
                {...field}
                formNoValidate
              />
            </div>
          </>
        )}
      />
      <div className="h-4 !mb-1">
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-sm text-red-500">{message}</p>
          )}
        />
      </div>
    </div>
  );
};

export default AuthInputFiled;
