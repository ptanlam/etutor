import { motion } from 'framer-motion';
import React, { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';

import {
  Box,
  Button,
  Divider,
  Grid,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

import { CardViewWithImage } from '../../../../components/CardViewWithImage';
import { ImageInput } from '../../../../components/ImageInput';
import { useImageUploading } from '../../../../hooks';
import { VisibilityProps } from '../../../../shared/props';
import { userDetailsSelector } from '../../../user/userSlice';
import { TutorRegistrationContext } from '../../contexts';
import { useTutorRegistrationDto } from '../../hooks';
import styles from './TutorRegistrationConfirmationForm.module.css';

export function TutorRegistrationConfirmationForm({
  isVisible,
}: VisibilityProps) {
  const { setImageList } = useTutorRegistrationDto();

  const {
    submit,
    dto: { description, degrees, certificates },
  } = useContext(TutorRegistrationContext);

  const fileUploadingInputRef = useRef<HTMLInputElement>(null);
  const { image, uploadImage } = useImageUploading();

  const { fullName, email, phoneNumber } = useSelector(userDetailsSelector);

  const onImageClick = () => {
    fileUploadingInputRef.current?.click();
  };

  const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(event);

    if (!event.target.files) return;
    setImageList({ images: event.target.files });
  };

  return (
    <>
      {isVisible && (
        <motion.div className={styles.container}>
          <Box style={{ flex: 2 }}>
            <ImageInput
              onImageClick={onImageClick}
              image={image}
              uploadImage={onUploadImage}
              label="Picture of tutor"
              ref={fileUploadingInputRef}
            />
          </Box>

          <Grid gutter={16} style={{ flex: 3 }}>
            <Grid.Col span={12}>
              <Grid>
                <Grid.Col span={12}>
                  <Divider />
                </Grid.Col>

                <Grid.Col span={12}>
                  <Title order={2} style={{ fontWeight: 900 }}>
                    Personal Information
                  </Title>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Grid gutter={12}>
                    <Grid.Col span={4}>
                      <Text>Name</Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text>{fullName}</Text>
                    </Grid.Col>

                    <Grid.Col span={4}>
                      <Text>Email</Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text>{email}</Text>
                    </Grid.Col>

                    <Grid.Col span={4}>
                      <Text>Phone number</Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text>{phoneNumber}</Text>
                    </Grid.Col>

                    <Grid.Col span={4}>
                      <Text>Description</Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text>{description}</Text>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>

            <Grid.Col span={12}>
              <Grid>
                <Grid.Col span={12}>
                  <Title order={2} style={{ fontWeight: 900 }}>
                    Tutoring Information
                  </Title>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Title order={5}>Degrees</Title>
                </Grid.Col>
                <Grid.Col span={12} className={styles.listContainer}>
                  {React.Children.toArray(
                    degrees?.map(
                      ({
                        name,
                        major,
                        dateOfIssue,
                        graduatedUniversity,
                        images,
                      }) => (
                        <CardViewWithImage files={images}>
                          <SimpleGrid cols={2}>
                            <Text>Name</Text>
                            <Text>{name}</Text>
                          </SimpleGrid>
                          <SimpleGrid cols={2}>
                            <Text>Major</Text>
                            <Text>{major}</Text>
                          </SimpleGrid>
                          <SimpleGrid cols={2}>
                            <Text>Date of issue</Text>
                            <Text>
                              {new Date(dateOfIssue).toLocaleDateString()}
                            </Text>
                          </SimpleGrid>
                          <SimpleGrid cols={2}>
                            <Text>University</Text>
                            <Text>{graduatedUniversity}</Text>
                          </SimpleGrid>
                        </CardViewWithImage>
                      ),
                    ),
                  )}
                </Grid.Col>

                <Grid.Col offset={3} span={6}>
                  <Divider />
                </Grid.Col>

                <Grid.Col span={12}>
                  <Title order={5}>Certificates</Title>
                </Grid.Col>
                <Grid.Col span={12} className={styles.listContainer}>
                  {certificates?.map(
                    ({
                      name,
                      placeOfIssue,
                      dateOfIssue,
                      expiresIn,
                      images,
                    }) => (
                      <CardViewWithImage files={images}>
                        <SimpleGrid cols={2}>
                          <Text>Name</Text>
                          <Text>{name}</Text>
                        </SimpleGrid>
                        <SimpleGrid cols={2}>
                          <Text>Place of issue</Text>
                          <Text>{placeOfIssue}</Text>
                        </SimpleGrid>
                        <SimpleGrid cols={2}>
                          <Text>Date of issue</Text>
                          <Text>
                            {new Date(dateOfIssue).toLocaleDateString()}
                          </Text>
                        </SimpleGrid>
                        <SimpleGrid cols={2}>
                          <Text>Expires in</Text>
                          <Text>
                            {new Date(expiresIn).toLocaleDateString()}
                          </Text>
                        </SimpleGrid>
                      </CardViewWithImage>
                    ),
                  )}
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>

            <Grid.Col
              span={12}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button onClick={submit}>Submit</Button>
            </Grid.Col>
          </Grid>
        </motion.div>
      )}
    </>
  );
}
