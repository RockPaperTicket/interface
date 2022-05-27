import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import InputField from '../common/form/InputField';
import { EventFactory__factory } from '../../contracts/types';
import { useEthers } from '@usedapp/core';
import { useActiveChain } from '../../hooks/useActiveChain';
import { useAlert } from '../../hooks/useAlert';
import { AvailableChains, ConnectToNetwork } from '../../utils/constants';

const CreateEventForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { library, switchNetwork, activateBrowserWallet } = useEthers();
  const { isActive, eventFactoryAddress, account } = useActiveChain();
  const { openAlert } = useAlert();

  const onSubmit = async (values: any) => {
    if (!isActive) return;
    try {
      const { name, tickets, price } = values;
      const signer = library?.getSigner();

      if (!eventFactoryAddress || !signer) return;
      const eventFactory = EventFactory__factory.connect(
        eventFactoryAddress,
        signer
      );

      const tx = await eventFactory.createEventGame(
        name,
        Number(tickets),
        Number(price)
      );

      await tx.wait();
      openAlert('Created a event successfully', 'success');
    } catch (error: any) {
      openAlert(
        error.message.replace(
          'VM Exception while processing transaction: revert ',
          ''
        )
      );
    }
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
        id="tickets"
        label="Number of tickets"
        errors={errors}
        register={register}
        type="number"
      />
      <InputField
        id="price"
        label="Price"
        errors={errors}
        register={register}
        type="number"
      />
      {!account ? (
        <Button onClick={activateBrowserWallet}>Connect</Button>
      ) : isActive ? (
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      ) : (
        <Button
          colorScheme="yellow"
          textTransform="capitalize"
          onClick={() => switchNetwork(AvailableChains[0])}
        >
          Switch To {ConnectToNetwork}
        </Button>
      )}
    </form>
  );
};
export default CreateEventForm;
