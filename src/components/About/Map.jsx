function Map({ className = '' }) {
    return (
        <div
            className={`w-full h-[400px] sm:min-h-screen shadow-lg overflow-hidden ${className}`}
        >
            <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.921595447653!2d77.43722457577634!3d28.39143597579727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc396202390af%3A0xf7891d8025d636ed!2sEchelon%20Institute%20Of%20Technology%20-%20Top%20BBA%2C%20BCA%2C%20B.Tech%2C%20M.Tech%2C%20MCA%2C%20MBA%20College%20in%20Faridabad!5e0!3m2!1sen!2sin!4v1740539840351!5m2!1sen!2sin"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}

export default Map;
