import Button from '@/components/Button';
import Head from 'next/head';
import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <Head>
        <title>Coming Soon</title>
        <meta name="description" content="We are working hard to launch our new site. Stay tuned!" />
      </Head>

      <main className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="p-5 bg-white mt-10 text-center">
            <div className="flex justify-center mt-3">
                <h1 className="text-5xl text-gray-900 tracking-wide cormorant-garamond !italic">
                    Coming Soon!
                </h1>
            </div>
            <hr className="w-full mt-4 mx-auto border border-[#3F3C3C]"></hr>

            <p className="text-lg m-4">We&apos;re working hard to launch our new website. Stay tuned!</p>

            <div className="my-8">
              <Link href="/">
                <Button message="Go to Home"/>
              </Link>
            </div>
          </div>
      </main>
    </div>
  );
}