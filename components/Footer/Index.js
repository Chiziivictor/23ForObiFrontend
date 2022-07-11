import Image from 'next/image';
import styles from './Styles.module.scss';
import logo from '../../assets/logo.png';
import Link from 'next/link';
import { useState } from 'react';
import DeliverModal from '../Modal/DeliverModal';

const Footer = () => {
  //Show Modal
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footer_container}>
          <div className={styles.footer__logo}>
            <Image src={logo} />
          </div>
          <div className={styles.footer__details}>
            <h2>Be a part of the movement</h2>
            <p>
              It matters today and it will even matter more tomorrow, let’s get
              back our Nigeria
            </p>
            <div className={styles.btn_div}>
              {/* <Link href=""> */}
              <button className="btn_dark" onClick={() => setShowModal(true)}>
                Deliver votes
              </button>
              {/* </Link> */}
            </div>
          </div>
          {showModal && (
            <DeliverModal
              show={showModal}
              onClose={() => setShowModal(false)}
            />
          )}
          <div>{/* <p>Game</p> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
