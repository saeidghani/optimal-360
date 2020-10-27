import React from 'react';
import { useQuery } from './useQuery';

const useForm = () => {
  const [parsedQuery] = useQuery();
  const [isFormDone, setIsFormDone] = React.useState(false);

  const validateForm = async (formRef, selectedSurveyGroupKey) => {
    try {
      const errorObj = await formRef.current.validateForm(formRef?.current?.values);

      if (errorObj && Object.values(errorObj).length > 0) {
        throw errorObj;
      } else {
        setIsFormDone(true);
      }
    } catch (errorObj) {
      formRef.current.setErrors(errorObj);
      formRef.current.setTouched(errorObj);

      // if (selectedSurveyGroupKey !== parsedQuery?.surveyGroupId) setSurveyGroupModal(true);
    }
  };

  // React.useEffect(() => {

  //   if (selectedSurveyGroupKey && formRef?.current) {
  //     validateForm(formRef);
  //   }

  //   // eslint-disable-next-line
  // }, [selectedSurveyGroupKey]);

  return [isFormDone, setIsFormDone, validateForm];
};

export { useForm };
