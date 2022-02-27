import { Container, Card } from "react-bootstrap";
import Quote from "../components/quote";
import Footer from "../components/footer";
import styles from "../styles/index.module.css";
import background from '../public/start.svg';
import Image from "next/image";
import Divider from "../components/divider";
import TwoContents from "../components/twocontents";
import HeadingAndContent from "../components/headingAndContent";

export default function Index() {

  return (
    <>
      <div style={{ zIndex: "-10" }}>
        <Image src={background} alt="background" />
      </div>
      <HeadingAndContent
        heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        subheading="Unterüberschrift"
        content=" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      />
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
            <img width={550} src="https://images.unsplash.com/photo-1599651993975-30a482e26467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          </div>
        </div>
      </div>
      <Divider />
      <TwoContents
        image1="https://images.unsplash.com/photo-1594081500655-8cf4a358b934?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        heading1="content"
        content1="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."

        image2="https://images.unsplash.com/photo-1590529989936-f6efdf774c23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        heading2="content"
        content2="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
      />
      <Footer />
    </>
  );
}
