import Quote from "../components/quote";
import Footer from "../components/footer";
import background from '../public/start.svg';
import Image from "next/image";
import Divider from "../components/divider";
import TwoContents from "../components/twocontents";
import HeadingAndContent from "../components/headingAndContent";
import { motion } from "framer-motion";
import FadeInView from "../components/animation/inview";
import styles from "../styles/index.module.css";

export default function Index() {

  return (
    <>
      <motion.div
        initial={{
          opacity: -5,
          y: 200
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            // type: "spring",
          }
        }}
        style={{ zIndex: "-10" }}
      >
        <Image src={background} alt="background" />
      </motion.div>
      <FadeInView>
        <HeadingAndContent
          heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          subheading="Unterüberschrift"
          content=" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        />
        <Divider />
      </FadeInView>
      <FadeInView>
        <div className={styles.quote}>
          <div className={styles.imageQuoteAlignment}>
            <div className={styles.imageQuoteFlex}>
              <div className="d-flex align-items-center h-100 me-5">
                <div>
                  <Quote quote="Horvath Anton, 32 Jahre und jo – gschiedn bin i"
                    author="Anton Horvath"
                  />
                </div>
              </div>
              <img className={styles.quoteImage} src="https://images.unsplash.com/photo-1599651993975-30a482e26467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            </div>
          </div>
        </div>
        <Divider />
      </FadeInView>
      <FadeInView>
        <TwoContents
          image1="https://images.unsplash.com/photo-1594081500655-8cf4a358b934?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          heading1="content"
          content1="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."

          image2="https://images.unsplash.com/photo-1590529989936-f6efdf774c23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          heading2="content"
          content2="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
        />
      </FadeInView>
      <Footer />
    </>
  );
}
