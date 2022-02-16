import { Container, Card } from "react-bootstrap";
import styles from "../styles/index.module.css";

export default function Index() {

  return (
    <>
      <img src="/start.svg" alt="start" />
      <div className="d-flex justify-content-center align-content-center mt-5 w-100 mb-5">
        <div className="w-50 d-flex justify-content-center mt-5">
          <div className="d-flex flex-row">
            <div className="d-flex align-items-center h-100 me-5">
              <div>
                <div className="d-flex flex-row">
                  <img width="24px" height="24px" className="mb-5 me-3" src="https://cdn-icons.flaticon.com/png/512/515/premium/515714.png?token=exp=1645030374~hmac=bb8c9e2ef5e3589240da1e915ac47bed" />
                  <div>

                    <span className={styles.babyshore}>
                      Horvath Anton, 32 Jahre und jo – gschiedn bin i
                    </span>
                    <br />
                    Anton Horvath
                  </div>
                </div>
              </div>
            </div>
            <img width={300} src="https://images.unsplash.com/photo-1599651993975-30a482e26467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          </div>
        </div>
      </div>
    </>
  );
}
// <div>Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>
