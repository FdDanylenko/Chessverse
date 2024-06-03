import React, { createContext, useRef, useContext, ReactNode } from "react";

const FormContext = createContext<any>({});

type AuthContextProviderProps = {
  children: ReactNode;
};

const FormProvider = ({ children }: AuthContextProviderProps) => {
  const formPictureRef = useRef<any>(null);
  const formDataRef = useRef<any>(null);

  const submitFormPicture = () => {
    if (formPictureRef.current) {
      formPictureRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const submitFormData = () => {
    if (formDataRef.current) {
      formDataRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <FormContext.Provider
      value={{ formPictureRef, formDataRef, submitFormPicture, submitFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

export default FormProvider;
