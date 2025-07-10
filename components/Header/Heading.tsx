import Head from 'next/head';

interface NavProps {
  t: {
    title: string;
    description: string;
  };
}

/**
 * Renders the page's <head> tag, including the dynamic title and meta description.
 * This is used for SEO and for the browser tab.
 * @param {object} props - The component props.
 * @param {object} props.t - The translation object.
 */
const Heading = ({ t }: NavProps) => {
  return (
    <Head>
      <title>{t.title}</title>
      <meta name="description" content={t.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

export default Heading;