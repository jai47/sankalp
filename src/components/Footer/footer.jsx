import Image from 'next/image';

const Footer = () => {
    const words = [
        'passion',
        'success',
        'goals',
        'rhythm',
        'fun',
        'energy',
        'opportunity',
    ];

    return (
        <footer className="w-screen h-[40vh] flex flex-wrap md:flex-nowrap bg-red-500">
            <div>
                <Image src={'/eit.png'} alt="footer" width={150} height={150} />
            </div>
        </footer>
    );
};

export default Footer;
