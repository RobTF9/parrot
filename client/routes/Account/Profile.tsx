import React from 'react';
import { useAuthContext } from '../../context/Auth';

const Profile: React.FC = () => {
  const { signOut } = useAuthContext();

  return (
    <div>
      <button type="button" onClick={signOut}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
