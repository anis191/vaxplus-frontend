// import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Free Vaccination Campaigns</a>
          <a className="link link-hover">Paid Campaigns</a>
          <a className="link link-hover">Donations</a>
          <a className="link link-hover">Awareness Programs</a>
        </nav>
        <nav>
          <h6 className="footer-title">VaxPlus</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Our Mission</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Stay Updated</h6>
          <fieldset className="w-80">
            <label className="label">
              <span className="label-text">Subscribe for campaign updates</span>
            </label>
            <div className="join">
              <input
                type="email"
                placeholder="youremail@example.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>

      <div className="bg-base-300 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} VaxPlus. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;