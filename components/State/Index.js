import Image from 'next/image';
import { BsShare, BsDownload } from 'react-icons/bs';
import styles from './Styles.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import SingleStateProgress from './../misc/SingleStateProgress';
import Card from '../Card/Card';
import { VillageCards } from '../Card/Cards';
import VILLAGESINCONTROL from '../../data/villageDetails';
import { villageNotInDetails } from '../../data/villageDetails';
import Modal from '../Modal/Index';
import { FaTimes } from 'react-icons/fa';
import Breadcrumbs from '../misc/Breadcrumbs';
import SOCIALMEDIAIMAGES from '../../data/smImages';

// Forms Import
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
// Prevent serverside redering on the FormikControl Component
import dynamic from 'next/dynamic';
const FormikControl = dynamic(() => import('../Forms/FormikControl'), {
  ssr: false,
});

//Images
import search from '../../assets/search.png';
import pdp from '../../assets/pdp.png';
import ikpeazu from '../../assets/ikpeazu.png';

import add_img from '../../assets/add_img.png';
import download_img from '../../assets/download.png';
import ImgCard from '../ImgCard/ImgCard';
import Link from 'next/link';
import ShareCard from '../ImgCard/ShareCard';

const State = ({ stateName }) => {
  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  // LightBox
  const [lightBox, setLightBox] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [activeTitle, setActiveTitle] = useState('');
  const [shareImg, setShareImg] = useState(false);
  // Filter
  const [searchVillage, setSearchVillage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchNotInQuery, setSearchNotInQuery] = useState('');
  const [searchParam] = useState(['name']);
  const [villagesIn, setVillagesIn] = useState(VILLAGESINCONTROL);
  const [villagesNotIn, setVillagesNotIn] = useState(villageNotInDetails);

  // Show LightBox Images
  const showImage = (image, text) => {
    setActiveImage(image);
    setActiveTitle(text);
    setLightBox(true);
  };

  // Share Images
  const shareSocial = (image) => {
    setShareImg(!shareImg);
  };
  //SEARCH VILLAGES
  const handleNotInVillageChange = (e) => {
    e.preventDefault();
    setSearchNotInQuery(e.target.value);
  };
  const handleInVillageChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const filter = (villages, query) => {
    return villages.filter((village) => {
      return searchParam.some((newVillage) => {
        return village[newVillage].toString().toLowerCase().indexOf(query) > -1;
      });
    });
  };

  // FUNCTION FOR PREVIEWING IMAGES
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imageArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imageArray));
  };

  // Handle Change
  const handleChange = (e) => {
    e.preventDefault();
    setSearchVillage(e.target.value);
  };
  // Filter Village

  //Effect to hide scroll
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = showModal || showModal2 ? 'hidden' : 'auto';
  }, [showModal, showModal2]);

  return (
    <div className={styles.state}>
      <div className="container">
        <div className={styles.state_heading}>
          <Breadcrumbs />
          <div className={styles.state_heading__title}>
            <h1 className="capitalize">{stateName} State Villages</h1>
            <div className={styles.vill_control}>
              <div className={styles.vill_control__text}>
                <h5>Villages in control</h5>
                <p>10% control</p>
              </div>
              <div className={styles.vill_control__progress}>
                <SingleStateProgress done={10} />
              </div>
            </div>
          </div>
          <div className={styles.state_heading__govt}>
            <div className={styles.govt_box}>
              <div className={styles.current_gov}>
                <p>Current governor</p>
                <div className={styles.current_gov__details}>
                  <Image src={ikpeazu} />
                  <div className={styles.text}>
                    <h5>Okezie Ikpeazu</h5>
                    <p>Since: May 29, 2015</p>
                    <p>Terms: 2(Two)</p>
                  </div>
                </div>
              </div>
              <div className={styles.hr}></div>
              <div className={styles.vote_dir}>
                <p>Last vote direction</p>
                <div className={styles.vote_dir__details}>
                  <Image src={pdp} />
                  <div className={styles.text}>
                    <h5>PDP</h5>
                    <p>People Democratic Party</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.state_vilage_controlled}>
          <div className={styles.state_vilage_controlled__head}>
            <h5>Villages in control</h5>
            <div className={styles.head_input}>
              <input
                type="text"
                placeholder="Search village here"
                value={searchQuery}
                onChange={handleInVillageChange}
              />
              <div className={styles.search_icon}>
                <Image src={search} alt="search" />
              </div>
            </div>
          </div>
          <div className="cards">
            {villagesIn && villagesIn.length > 0 ? (
              filter(villagesIn, searchQuery.toLowerCase()).map((item) => (
                <Card
                  key={item.id}
                  village={item.name}
                  type={item.type}
                  progress={item.progress}
                  slug={item.slug}
                />
              ))
            ) : (
              <h2 className="text-lg">No Village exists</h2>
            )}
          </div>
        </div>
        <div className={styles.state_vilage_not_controlled}>
          <div className={styles.state_vilage_not_controlled__head}>
            <h5>Villages not in control</h5>
            <div className={styles.head_input}>
              <input
                type="text"
                placeholder="Search state here"
                value={searchNotInQuery}
                onChange={handleNotInVillageChange}
              />
              <div className={styles.search_icon}>
                <Image src={search} alt="search" />
              </div>
            </div>
          </div>
          <div className="cards">
            {villagesNotIn && villagesNotIn.length > 0 ? (
              filter(villagesNotIn, searchNotInQuery.toLowerCase()).map(
                (item) => (
                  <Card
                    key={item.id}
                    village={item.name}
                    type={item.type}
                    progress={item.progress}
                    slug={item.slug}
                  />
                )
              )
            ) : (
              <h2 className="text-lg">No Village exists</h2>
            )}
          </div>
        </div>
        <div className={styles.btn_missing}>
          <button onClick={() => setShowModal(true)} className="btn_dark">
            Add a missing village
          </button>
        </div>

        {/**** Modal *****/}
        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            width="54.4rem"
          >
            <div className={styles.modal}>
              <div className={`${styles.modal__heading} modal_heading`}>
                <h2>
                  Add a missing <br />
                  <span>Village</span>
                </h2>
                <button
                  className={`closeBtn`}
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className={styles.modal__body}>
                <p>Kindly add a missing village</p>
                <Formik
                  initialValues={{ village: '' }}
                  validationSchema={Yup.object({
                    village: Yup.string().required('Required'),
                  })}
                  onSubmit={(values) => console.log('Form data', values)}
                >
                  {({ values }) => (
                    <Form autoComplete="off">
                      <FormikControl
                        values={values}
                        control="input"
                        placeholder="Enter village name"
                        name="village"
                      />
                      <button className="btn_dark" type="submit">
                        Continue
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Modal>
        )}
        {/**** End Modal *****/}
        {/* Social Media Images */}
        <div className={styles.social_media_image}>
          <div className={styles.social_media_image__head}>
            <div className={styles.head_text}>
              <h5>Images</h5>
              <p>
                These are social media images across your state from the
                supporters and contributors.
              </p>
            </div>
            <div className={styles.head_btn}>
              <button onClick={() => setShowModal2(true)} className="btn_light">
                Contribute images
              </button>
              {/* CONTRIBUTE MODAL */}
              {showModal2 && (
                <Modal
                  show={showModal2}
                  onClose={() => setShowModal2(false)}
                  width="54.4rem"
                >
                  <div className={styles.modal}>
                    <div className={`${styles.modal__heading} modal_heading`}>
                      <h2>
                        Contribute <br />
                        <span>Your image</span>
                      </h2>
                      <button
                        className={`closeBtn`}
                        onClick={() => setShowModal2(false)}
                      >
                        &times;
                      </button>
                    </div>
                    <div className={styles.modal__body}>
                      <p>
                        You can add new images from activities around your
                        states and village. File should be in .pdf, .jpeg, .jpg,
                        .png formats with less than 10 MB size
                      </p>
                      <div className={styles.file_input}>
                        <form>
                          <div className={styles.images_prev_container}>
                            {selectedImages &&
                              selectedImages.map((image, index) => {
                                return (
                                  <div
                                    key={image}
                                    className={styles.image_preview}
                                  >
                                    <Image
                                      src={image}
                                      width={100}
                                      height={100}
                                    />
                                    <div
                                      onClick={() =>
                                        setSelectedImages(
                                          selectedImages.filter(
                                            (e) => e !== image
                                          )
                                        )
                                      }
                                      className={styles.cancel}
                                    >
                                      <FaTimes />
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                          <div className={styles.upload}>
                            <button type="button" className={styles.btn_upload}>
                              <Image src={add_img} />
                              <p>Add a new image</p>
                              <input
                                type="file"
                                name=""
                                id=""
                                onChange={onSelectFile}
                                multiple
                                accept="image/png, image/jpeg, image/webp"
                              />
                            </button>
                          </div>
                          <p className={styles.input_text}>
                            You can upload upto 3 pdf or 10 image files
                          </p>
                          <button className={`${styles.btn_submit} btn_dark`}>
                            Complete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
          <div className={styles.state_body_cards}>
            {SOCIALMEDIAIMAGES.map((item, index) => (
              <ImgCard
                src={item.src}
                key={index}
                title={item.title}
                onClick={() => {
                  showImage(item.src, item.title), setShowModal3(true);
                }}
              />
            ))}
            {showModal3 && (
              <Modal
                show={showModal}
                onClose={() => setShowModal3(false)}
                width="54.4rem"
              >
                <div className="py-4 text-[##2F3733]">
                  <h5 className="font-light">Uploaded</h5>
                  <p className="font-bold">Images</p>
                </div>
                <hr className="border-[#E1E1E1] border-1 mb-5" />
                <div className="rounded-2xl">
                  {lightBox ? (
                    <div className={styles.lightbox}>
                      <Image
                        src={activeImage}
                        width="612px"
                        height="278px"
                        alt=""
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="pt-6">
                  <h5 className="text-4xl lg:text-2xl font-bold text-[#2F3733]">
                    {activeTitle.toUpperCase()}
                  </h5>
                  <div className="flex justify-between w-1/3 text-[#5678CE] py-6">
                    <div
                      className="flex items-center justify-between text-2xl mr-10 hover:text-black"
                      onClick={() => shareSocial(shareImg)}
                    >
                      <BsShare />
                      <h5 className="text-4xl lg:text-2xl ml-3">Share</h5>
                      {shareImg && (
                        <ShareCard image={activeImage} title={activeTitle} />
                      )}
                    </div>
                    <div>
                      <a
                        href={`${activeImage}`}
                        download
                        className="flex items-center justify-between hover:text-black"
                      >
                        <BsDownload className="text-2xl" />
                        <h5 className="text-4xl lg:text-2xl ml-3 ">Download</h5>
                      </a>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
