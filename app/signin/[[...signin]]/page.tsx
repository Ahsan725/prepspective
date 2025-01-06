import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Aligns towards the top
        height: '100vh',
        paddingTop: '50px', // Adjusts the position down slightly from the top
      }}
    >
      <SignIn />
    </div>
  );
}
