'use client';
import Card from '../../../components/About/Card';
import Map from '../../../components/About/Map';
import ContactUs from '../../../components/About/ContactUs';
import Parallex from '@/components/Parallex';

// DUMMY DATA
const contributors = [
    {
        name: 'JAI MISHRA',
        facebook: 'https://www.instagram.com/',
        twitter: 'https://x.com/explore',
        role: 'Team Lead & Designer',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQEY37vruljt_g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706374654281?e=1746662400&v=beta&t=RCmjoMXRYukd-0R9XSFiBew-Q4UlLfIR6RHh749L39g',
    },
    {
        name: 'HIMANSHU PAL',
        facebook: 'https://www.instagram.com/',
        twitter: 'https://x.com/explore',
        role: 'Devloper & Co-Team Lead',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQFCiOqfWdbhOQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724551817493?e=1746662400&v=beta&t=aftMYEjrM9068ie7U-YRKvtFcSWI0_4sLVHuuynmRBI',
    },
    {
        name: 'ANKIT SINGH',
        facebook: 'https://www.instagram.com/',
        twitter: 'https://x.com/explore',
        role: 'Machine Learning Devloper',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQGb4-lIAeE1Dg/profile-displayphoto-shrink_400_400/B56ZVbBSXZGsAk-/0/1740988822885?e=1746662400&v=beta&t=bdS20Xb5FDC7DFlRCzVUd70loNnTbFHhtk0hD1LzU34',
    },
];

function About() {
    return (
        <div className=" min-h-screen">
            {/* HERO SECTION */}
            <Parallex
                image="/bg2.jpeg"
                desc="We are technology enthusiasts who love to write about the latest trends in the tech industry. We are a team of passionate writers who love to share our knowledge with the world."
                heading="Know more about us"
            />

            {/* PARAGRAPH */}
            <div className="mt-10 flex flex-col items-center justify-center px-4">
                <p className="text-center w-1/2 leading-8">
                    Echelon Institute of Technology (EIT), Faridabad,
                    established in 2007, is a premier institution dedicated to
                    academic excellence, innovation, and holistic development.
                    EIT is affiliated to JC Bose University of Science &
                    Technology, Faridabad, Haryana, and is approved by AICTE,
                    Ministry of HRD, Government of India, and the Directorate of
                    Technical Education, Haryana.
                </p>
            </div>

            {/* CONTRIBUTORS SECTION */}
            <section className="mt-10 py-10 flex flex-col gap-14">
                <div className="flex items-center gap-4 px-4">
                    <hr className="flex-grow border-t border-red-500" />
                    <h1 className="text-4xl font-semibold uppercase">
                        Contributors
                    </h1>
                    <hr className="flex-grow border-t border-red-500" />
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-15 px-4">
                    {contributors.map((contributor, index) => (
                        <Card key={index} {...contributor} />
                    ))}
                </div>
            </section>

            {/* MAP & TALK-TO-US SECTION */}
            <section className="flex flex-col md:flex-row justify-between p-5 gap-5">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <Map />
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center ">
                    <ContactUs />
                </div>
            </section>
        </div>
    );
}

export default About;
