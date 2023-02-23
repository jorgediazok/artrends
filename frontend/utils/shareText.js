export function getWhatsappShareText(trend, currentIndex, title) {
  if (trend === "twitter") {
    return `https://api.whatsapp.com/send?text=En%20este%20momento${encodeURI(
      title
    )} está en el puesto N° ${
      currentIndex + 1
    } en Twitter Argentina. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}`;
  }
  if (trend === "spotify.artist") {
    return `https://api.whatsapp.com/send?text=En este momento ${encodeURI(
      title
    )} está en el puesto N° ${
      currentIndex + 1
    } en el ranking de artistas de Spotify Argentina. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}`;
  }
  if (trend === "spotify.song") {
    return `https://api.whatsapp.com/send?text=En este momento ${encodeURI(
      title
    )} está en el puesto N° ${
      currentIndex + 1
    } en el ranking de canciones de Spotify Argentina. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}`;
  }
  if (trend === "spotify.podcast") {
    return `https://api.whatsapp.com/send?text=En este momento ${encodeURI(
      title
    )} está en el puesto N° ${
      currentIndex + 1
    } en el ranking de podcasts de Spotify Argentina. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}`;
  }
  if (trend === "youtube") {
    return `https://api.whatsapp.com/send?text=En este momento ${encodeURI(
      title
    )} está en el puesto N° ${
      currentIndex + 1
    } en el ranking de videos de Youtube en Argentina. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}`;
  }
  if (trend === "google") {
    return `https://api.whatsapp.com/send?text=En este momento ${encodeURI(
      title
    )} está en el puesto N° ${
      currentIndex + 1
    } de lo más buscado en Google dentro de Argentina. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}`;
  }
  if (trend === "portals.laNacion") {
    return `https://api.whatsapp.com/send?text=[${encodeURI(
      title
    )}] está en el puesto N° ${
      currentIndex + 1
    } de lo más leído en La Nación. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}
    `;
  }
  if (trend === "portals.elDestape") {
    return `https://api.whatsapp.com/send?text=[${encodeURI(
      title
    )}] está en el puesto N° ${
      currentIndex + 1
    } de lo más leído en El Destape. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}
    `;
  }
  if (trend === "portals.clarin") {
    return `https://api.whatsapp.com/send?text=[${encodeURI(
      title
    )}] está en el puesto N° ${
      currentIndex + 1
    } de lo más leído en Clarín. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}
    `;
  }
  if (trend === "portals.telam") {
    return `https://api.whatsapp.com/send?text=[${encodeURI(
      title
    )}] está en el puesto N° ${
      currentIndex + 1
    } de lo más leído en Télam. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}
    `;
  }
  if (trend === "portals.infobae") {
    return `https://api.whatsapp.com/send?text=[${encodeURI(
      title
    )}] está en el puesto N° ${
      currentIndex + 1
    } de lo más leído en Infobae. Seguí todas las tendencias en Artrends ${encodeURIComponent(
      "https://artrends.ar"
    )}
    `;
  }
}

export function getTwitterShareText(trend, currentIndex, title) {
  if (trend === "twitter") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
      title
    )}%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20en%20Twitter%20Argentina.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "spotify.artist") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
      title
    )}%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20en%20el%20ranking%20de%20artistas%20de%20Spotify%20Argentina.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "spotify.song") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
      title
    )}%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20en%20el%20ranking%20de%20canciones%20de%20Spotify%20Argentina.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "spotify.podcast") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
      title
    )}%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20en%20el%20ranking%20de%20podcasts%20de%20Spotify%20Argentina.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "youtube") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
      title
    )}%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20en%20el%20ranking%20de%20videos%20de%20Youtube%20en%20Argentina.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "google") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
      title
    )}%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20de%20lo%20más%20buscado%20en%20Google%20dentro%20de%20Argentina.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "portals.laNacion") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=[${encodeURIComponent(
      title
    )}]%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20de%20lo%20más%20leído%20en%20La%20Nación.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "portals.elDestape") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=[${encodeURIComponent(
      title
    )}]%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20de%20lo%20más%20leído%20en%20El%20Destape.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "portals.clarin") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=[${encodeURIComponent(
      title
    )}]%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20de%20lo%20más%20leído%20en%20Clarín.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "portals.telam") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=[${encodeURIComponent(
      title
    )}]%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20de%20lo%20más%20leído%20en%20Télam.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
  if (trend === "portals.infobae") {
    return `https://twitter.com/intent/tweet?url=artrends.ar&text=[${encodeURIComponent(
      title
    )}]%20está%20en%20el%20puesto%20N°%20${
      currentIndex + 1
    }%20de%20lo%20más%20leído%20en%20Infobae.%20Seguí%20todas%20las%20tendencias%20en%20%23Artrends`;
  }
}
