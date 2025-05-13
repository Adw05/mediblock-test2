import React from 'react';
import { Stethoscope } from '@phosphor-icons/react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-10">
      <div className="flex items-center justify-center mb-2">
        <Stethoscope size={32} className="text-teal-600 mr-2" />
        <h1 className="text-4xl font-bold text-teal-600">MediChain Connect</h1>
      </div>
      <p className="text-gray-600 text-xl">
        Securely Manage Patient Records on the Blockchain
      </p>
    </header>
  );
};

export default Header;