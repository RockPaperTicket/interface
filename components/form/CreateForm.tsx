import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import InputField from '../common/form/InputField';

const CreateEventForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="name"
        label="Name of the event"
        errors={errors}
        register={register}
      />
      <InputField
        id="description"
        label="Description"
        as="textarea"
        errors={errors}
        register={register}
      />
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};
export default CreateEventForm;
