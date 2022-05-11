import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import CreateForm from '../components/form/CreateForm';

const CreateEvent: NextPage = () => {
  return (
    <>
      <Heading>Create a event</Heading>
      <CreateForm />
    </>
  );
};

export default CreateEvent;
