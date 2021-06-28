function graphql(query, variables = {}) {
  return fetch('/admin/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables,
      query,
    }),
  }).then(function (result) {
    return result.json();
  });
}

const GET_PAGE = `
    query GetTodos {
      allPages(where: { id: 1 }) {
        title,
        content
      }
    }
  `;

graphql(GET_PAGE).then(function(result){
  console.log(JSON.parse(result.data.allPages[0].content).css);
  // Replace the script tag with the app
  document.getElementById('page-app').parentNode.innerHTML = JSON.parse(result.data.allPages[0].content).html;
  //document.getElementsByTagName('head').innerHTML = '<style type="text/css">'+JSON.parse(result.data.allPages[0].content).css+'</style>';
  var style = document.createElement('style');
  style.innerHTML = JSON.parse(result.data.allPages[0].content).css;
  document.head.appendChild(style);

  // var head = document.head || document.getElementsByTagName('head')[0],
  //     style = document.createElement('style');
  //
  // head.appendChild(style);
  // style.appendChild(document.createTextNode(JSON.parse(result.data.allPages[0].content).css));
});

