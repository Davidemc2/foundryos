
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-gray-800 section-dark">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <span className="text-violet-600 text-2xl mr-2">●</span>
            <span className="text-lg font-bold text-white">Foundry OS<span className="text-violet-500">.</span></span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-violet-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Privacy</a>
            <a href="mailto:daviedwards.mc2@gmail.com" className="hover:text-violet-400 transition-colors">
              daviedwards.mc2@gmail.com
            </a>
            <p>© {currentYear} Foundry OS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
