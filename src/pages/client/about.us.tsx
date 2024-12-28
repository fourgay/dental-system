import { Button } from "antd";
import introduce from "assets/about-us/about-us.png";
import doctor1 from "assets/about-us/doctor-1.png";
import doctor2 from "assets/about-us/doctor-2.png";
import doctor3 from "assets/about-us/doctor-3.png";

import "styles/about.us.scss";

export const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="introduce">
        <div className="introduce__title">Giới thiệu</div>
        <div className="introduce__img">
          <img src={introduce} />
        </div>
        <div className="introduce__content">
          <div className="title">Our Mission</div>
          <div className="detail">
            <div>
              At Northern Heights Dental, people come first. We help each of our
              patients to achieve optimal wellness and health by using a whole
              body approach to oral health. This means not just focusing on
              cavities, but focusing on; cranio-facial development, bite and
              joint balance, oral flora, proper muscle balance/function, and
              bio-compatibility of dental materials. Great care and planning
              ensure that everything we do helps promote overall health and well
              being.
            </div>
            <div
              style={{
                fontWeight: "500",
                fontSize: "20px",
                margin: "20px 0",
                textTransform: "capitalize",
              }}
            >
              More than anything else we love creating happy, healthy smiles.
            </div>
            <div>
              We work hard to stay up to date with the most advanced techniques
              and technologies to ensure that our patients receive the best care
              possible. Our office utilizes 3D CBCT radiographs to allow for
              guided surgical and endodontic protocols. This enables these
              procedures to performed digitally before they are performed
              surgically to ensure optimal results. 3D imaging also is utilized
              for the analysis of airway growth and development. We also use the
              best 3D optical scanner for all of our dental restoration and
              Invisalign impressions. Dr Williams is a strong advocate for using
              microsurgical techniques, this means less discomfort and faster
              healing times.
            </div>
          </div>
        </div>
      </div>
      <div className="specialists">
        <div className="specialists__title">Meet our specialists</div>
        <div className="specialists__detail">
          We use only the best quality materials on the market in order to
          provide the best products to our patients.
        </div>
        <div className="specialists__content">
          <div className="card">
            <div className="card-img">
              <img src={doctor1} />
            </div>
            <div className="card-content">
              <div className="title">DR. Brent</div>
              <div className="detail">
                Dr. Brent provides general and cosmetic dentistry services at
                Northern Heights Dental in Flagstaff, Arizona. He has extensive
                experience in general and cosmetic dentistry, including full
                mouth restoration, dental veneers, crowns, bridges, dental
                implants, wisdom teeth extractions, Invisalign, and dentures.
                Dr. Brent and his younger sister grew up in Massachusetts with a
                mother who worked as a hygienist and a grandfather who was a
                general dentist.
              </div>
              <Button type="primary">Đặt lịch với bác sĩ này!</Button>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={doctor2} />
            </div>
            <div className="card-content">
              <div className="title">DR. Ashish J. Vashi</div>
              <div className="detail">
                Dr. Ashish J. Vashi has been practicing general, cosmetic and
                implant dentistry in California for over 18 years. He believes
                in giving the highest quality dentistry in a comfortable, caring
                environment. He strives to get to know his patients, not just
                their teeth.including full mouth restoration, dental veneers,
                crowns, bridges, dental implants, wisdom teeth extractions,
                Invisalign, and dentures.
              </div>
              <Button type="primary">Đặt lịch với bác sĩ này!</Button>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={doctor3} />
            </div>
            <div className="card-content">
              <div className="title">Dr. James Connors</div>
              <div className="detail">
                When it comes to oral surgeons, few can compare to the
                modern-day legend that is Dr. James Connors. As our oral and
                maxillofacial surgery specialist, Dr. Connors will brighten your
                day with his seasoned expertise, welcoming conversations, and –
                of course – his signature rotation of fun bowties. Dr. Connors
                and his younger sister grew up in Massachusetts with a mother
                who worked as a hygienist and a grandfather who was a general
                dentist.
              </div>
              <Button type="primary">Đặt lịch với bác sĩ này!</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
