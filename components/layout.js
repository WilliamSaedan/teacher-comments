import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }) {
    return (
        <div className='md:mx-auto font-poppins'>
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
