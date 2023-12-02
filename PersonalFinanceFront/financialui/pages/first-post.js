import ProtectedRoute from '../components/ProtectedRoute';


export default function Firstpost() {

  return (

    <ProtectedRoute>
      <div>
        <h1>This is a Protected Page</h1>
        <p>Only authenticated users can access this content.</p>
      </div>
    </ProtectedRoute>
  );
  
}