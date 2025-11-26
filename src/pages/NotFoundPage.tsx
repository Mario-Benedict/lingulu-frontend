import {Link} from  'react-router-dom';

const createNotFoundPage = () =>{
    return (
        <div style={{textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw'}}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go to Home Page</Link>
        </div>
    );
}

export default createNotFoundPage;