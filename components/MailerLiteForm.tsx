'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    ml_webform_success_30964444?: () => void;
    ml_jQuery?: any;
    jQuery?: any;
  }
}

export function MailerLiteForm() {
  useEffect(() => {
    // Define the success callback function
    window.ml_webform_success_30964444 = function() {
      const $ = window.ml_jQuery || window.jQuery;
      if ($) {
        $('.ml-subscribe-form-30964444 .row-success').show();
        $('.ml-subscribe-form-30964444 .row-form').hide();
      }
    };

    // Fetch the form configuration
    fetch("https://assets.mailerlite.com/jsonp/1646113/forms/165734787742434824/takel")
      .catch(err => console.error('MailerLite form config fetch error:', err));
  }, []);

  return (
    <>
      <style jsx>{`
        .ml-form-embedSubmitLoad {
          display: inline-block;
          width: 20px;
          height: 20px;
        }

        .ml-form-embedSubmitLoad:after {
          content: " ";
          display: block;
          width: 11px;
          height: 11px;
          margin: 1px;
          border-radius: 50%;
          border: 4px solid #fff;
          border-color: #ffffff #ffffff #ffffff transparent;
          animation: ml-form-embedSubmitLoad 1.2s linear infinite;
        }

        @keyframes ml-form-embedSubmitLoad {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div id="mlb2-30964444" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-30964444">
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm w-full max-w-2xl mx-auto">

            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <form
                className="ml-block-form"
                action="https://assets.mailerlite.com/jsonp/1646113/forms/165734787742434824/subscribe"
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="ml-form-fieldRow flex-1">
                      <div className="ml-field-group ml-field-name">
                        <input
                          aria-label="name"
                          type="text"
                          className="form-control w-full px-5 py-3 bg-white border border-border rounded-lg placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          data-inputmask=""
                          name="fields[name]"
                          placeholder="Your Name"
                          autoComplete="given-name"
                        />
                      </div>
                    </div>

                    <div className="ml-form-fieldRow ml-last-item flex-1">
                      <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                        <input
                          aria-label="email"
                          aria-required="true"
                          type="email"
                          className="form-control w-full px-5 py-3 bg-white border border-border rounded-lg placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          data-inputmask=""
                          name="fields[email]"
                          placeholder="Your Email"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="ml-form-embedSubmit">
                      <button
                        type="submit"
                        className="primary px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Subscribe
                      </button>

                      <button
                        disabled
                        style={{ display: 'none' }}
                        type="button"
                        className="loading px-8 py-3 bg-black text-white rounded-lg"
                      >
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                  </div>

                  <div className="ml-form-embedPermissions mt-4">
                    <div className="ml-form-embedPermissionsContent default privacy-policy text-center">
                      <p className="text-sm text-muted-foreground">
                        Join our community of music lovers and sustainability advocates. Unsubscribe anytime.
                      </p>
                    </div>
                  </div>
                </div>

                <input type="hidden" name="ml-submit" value="1" />
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>

            <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
              <div className="ml-form-successContent text-center bg-accent/20 backdrop-blur rounded-lg p-8 border border-border">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-2xl mb-2">Welcome to the Community!</h4>
                <p className="text-muted-foreground">You've successfully joined our festival newsletter. Get ready for exclusive updates!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024"
        strategy="afterInteractive"
      />
    </>
  );
}