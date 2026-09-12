import { HomeClient } from './home-client';
import { homePageSchema } from '@/lib/structured-data';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <HomeClient />
    </>
  );
}
