import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { TutorDetails as TutorDetailsModel } from '../../../../models/tutor';
import { TutorBookingForm } from '../../components/TutorBookingForm';
import { TutorDetails } from '../../components/TutorDetails';

export function TutorDetailsManagement() {
  const { id } = useParams<{ id: string }>();
  const { tutorsService } = useContext(ApplicationContext);

  const [bookingFormOpened, setBookingFormOpened] = useState(false);

  const { data, isLoading, isError } = useQuery(
    ['tutors', id],
    () => tutorsService.getDetails(id!),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );

  const toggleBookingForm = () => {
    setBookingFormOpened(!bookingFormOpened);
  };

  return (
    <>
      <Wrapper<TutorDetailsModel>
        type="page"
        data={data}
        hasError={isError}
        loading={isLoading}
      >
        <TutorDetails
          tutor={data!}
          openBookingForm={toggleBookingForm}
          bookingFormOpened={bookingFormOpened}
        />
      </Wrapper>

      <TutorBookingForm
        opened={bookingFormOpened}
        tutor={data || {}}
        onClose={toggleBookingForm}
      />
    </>
  );
}
