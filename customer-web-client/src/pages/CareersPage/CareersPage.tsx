import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Container, SimpleGrid, Text, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { ApplicationContext } from '../../contexts';
import { userDetailsSelector } from '../../features/user/userSlice';

export function CareersPage() {
  const navigate = useNavigate();
  const { tutorsService } = useContext(ApplicationContext);
  const { openModal } = useModals();

  const { id: userId } = useSelector(userDetailsSelector);

  const { data: isExisting, isLoading } = useQuery(
    ['tutors', 'users', userId, 'existing'],
    () => tutorsService.checkUserExisting(userId),
    { enabled: !!userId },
  );

  const onForTutorClick = async () => {
    if (!isExisting) {
      navigate('/tutors/registration-form');
      return;
    }

    openModal({
      title: <Text color="red">Action denied</Text>,
      children: (
        <Text>
          You have already submitted a tutor registration which is processing by
          administrators. Please be patient.
        </Text>
      ),
    });
  };

  return (
    <Container size="md">
      <SimpleGrid cols={1} spacing={16}>
        <Title>Join us</Title>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum sequi ut
          earum placeat, laudantium, est facere quis quaerat impedit adipisci ea
          eius consequatur, iure temporibus ducimus minus magnam iste ab.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit et fuga
          dignissimos ex iste vitae magnam pariatur qui consequatur soluta
          assumenda quibusdam, voluptas dolorem nemo saepe nulla quo eligendi
          officia! Officia, maxime veniam, sit illo possimus praesentium
          voluptatem iste soluta, minima dolorem nemo. Libero voluptate dolorum
          optio modi adipisci commodi minus perspiciatis velit consequatur, non
          nam maiores. Dolor, eveniet voluptatibus. Doloribus id ab numquam
          odit. Praesentium iure, sunt amet vitae earum atque molestiae fuga
          velit consequatur omnis reiciendis saepe! Quo aspernatur sint culpa ex
          fugiat maiores, ducimus cum exercitationem explicabo?
        </Text>

        <SimpleGrid cols={2}>
          <Button onClick={onForTutorClick} loading={isLoading}>
            for tutor
          </Button>
          <Button color="green" disabled>
            for staff
          </Button>
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}
