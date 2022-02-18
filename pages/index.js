import { Container, Card } from "react-bootstrap";
import Quote from "../components/quote";
import Footer from "../components/footer";
import styles from "../styles/index.module.css";
import background from '../public/start.svg';
import Image from "next/image";
import Divider from "../components/divider";

export default function Index() {

  return (
    <>
      <Image src={background} alt="background" />
      <div className="d-flex justify-content-center align-content-center mt-5 w-100 mb-5">
        <div className="w-75 d-flex justify-content-center mt-5">
          <div className="d-flex flex-column align-items-center h-100 me-5 w-50">
            <div className={styles.heading}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>

            <div className={`${styles.subheading} mt-3 mb-3`} >
              Unterüberschrift
            </div>

            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="d-flex justify-content-center align-content-center mt-3 w-100 mb-5">
        <div className="w-75 d-flex justify-content-center mt-5">
          <div className="d-flex flex-row">
            <div className="d-flex align-items-center h-100 me-5">
              <div>
                <Quote quote="Horvath Anton, 32 Jahre und jo – gschiedn bin i"
                  author="Anton Horvath"
                />
              </div>
            </div>
            <img width={500} src="https://images.unsplash.com/photo-1599651993975-30a482e26467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
// <div>Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>
