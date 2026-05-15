import { Column, Heading, Text, Flex, Meta, Schema } from "@once-ui-system/core";
import { baseURL, privacy, person, about } from "@/resources";
import styles from './privacy.module.scss';

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: privacy.title,
    description: privacy.description,
    baseURL: baseURL,
    path: '/privacy',
  });
  
  return {
    ...metadata,
    alternates: {
      canonical: `${baseURL}/privacy`,
    },
  };
}

export default function PrivacyPolicy() {
  return (
    <Column maxWidth="m" paddingY="xl" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/privacy"
        title={privacy.title}
        description={privacy.description}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Flex direction="column" gap="s">
        <Heading variant="display-strong-s">
          {privacy.title}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Last updated: {privacy.lastUpdated}
        </Text>
      </Flex>

      <Column gap="m" className={styles.content}>
        <Text variant="body-default-m" as="div">
          {privacy.content}
        </Text>
      </Column>
    </Column>
  );
}
