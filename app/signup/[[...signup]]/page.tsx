import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Aligns near the top
        height: '100vh',
        paddingTop: '50px', // Add some spacing from the top
      }}
    >
      <SignUp />
    </div>
  );
}
