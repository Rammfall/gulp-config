const getURLParams = () => {
  const paramObj = {};
  const search = window.location.search.substring(1);
  search.replace(/([^=&]+)=([^&]*)/g, (m, key, value) => {
    paramObj[decodeURIComponent(key)
      .toLocaleLowerCase()] = decodeURIComponent(value);
  });
  return paramObj;
};

export default class SendData {
  static send = (form) => {
    const data = new FormData(form);
    const action = form.getAttribute('action');
    const dataAction = form.dataset.action;
    const URLParams = getURLParams();
    const elements = form.elements;
    const redirect = `${document.location.origin + document.location.pathname}thank-redir.html`;

    if (dataAction) {
      const bitrixData = new FormData();

      bitrixData.append('name', elements['entry.317589276'].value);
      bitrixData.append('phone', elements['entry.870452131'].value);
      bitrixData.append('email', elements['entry.1133896419'].value);
      bitrixData.append('entry_course', elements['entry_course'].value);
      bitrixData.append('utm_medium', URLParams.utm_medium);
      bitrixData.append('utm_campaign', URLParams.utm_campaign);
      bitrixData.append('utm_source', URLParams.utm_source);
      bitrixData.append('utm_term', URLParams.utm_term);
      bitrixData.append('utm_content', URLParams.utm_content);
      bitrixData.append('source', window.location.href);

      fetch(dataAction, {
        method: 'POST',
        mode: 'no-cors',
        body: bitrixData,
      })
        .then(() => {
          console.log('success');
        })
        .catch(() => {
          console.log('error');
        });
    }

    data.append('entry.1373772408', URLParams.utm_medium);
    data.append('entry.495120786', URLParams.utm_campaign);
    data.append('entry.1663679606', URLParams.utm_source);
    data.append('entry.731373632', URLParams.utm_term);
    data.append('entry.527790722', URLParams.utm_content);
    data.append('entry.753427753', URLParams.city);

    fetch(action, {
      method: 'POST',
      mode: 'no-cors',
      body: data,
    })
      .then(() => {
        setTimeout(() => {
          document.location.href = redirect;
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          document.location.href = redirect;
        }, 1000);
      });
  };
}
