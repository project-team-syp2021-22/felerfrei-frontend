import { Container, Card } from "react-bootstrap";
import Quote from "../components/quote";
import Footer from "../components/footer";

export default function Index() {

  return (
    <>
      <img src="/start.svg" alt="start" />
      <div className="d-flex justify-content-center align-content-center mt-5 w-100 mb-5">
        <div className="w-50 d-flex justify-content-center mt-5">
          <div className="d-flex flex-row">
            <div className="d-flex align-items-center h-100 me-5">
              <div>
                <Quote quote="Horvath Anton, 32 Jahre und jo – gschiedn bin i"
                  author="Anton Horvath"
                />
              </div>
            </div>
            <img width={300} src="https://images.unsplash.com/photo-1599651993975-30a482e26467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
// <div>Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>
