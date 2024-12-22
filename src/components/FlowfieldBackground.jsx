import FlowField from '../FlowField';

const FlowfieldBackground = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-offwhite -z-50 dark:bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <FlowField/>
      </div>
    </div>
  );
}

export default FlowfieldBackground;