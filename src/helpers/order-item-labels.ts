export function getProductOrderLabel(type: string, fallbackName: string) {
  if (type === "WATER") {
    return {
      title: "Água",
      subtitle:
        "Reposição do conteúdo. Use se o cliente já tem o vasilhame.",
    };
  }

  if (type === "GAS") {
    return {
      title: "Gás",
      subtitle: "Reposição do conteúdo. Use se o cliente já tem o botijão.",
    };
  }

  return {
    title: fallbackName,
    subtitle: undefined,
  };
}

export function getAddonSectionHeader(isExpanded: boolean) {
  if (isExpanded) {
    return {
      title: "Comprar também o vasilhame",
      subtitle: undefined,
    };
  }

  return {
    title: "Não tem o vasilhame?",
    subtitle:
      "Toque para incluir o recipiente ou botijão se o cliente ainda não tem.",
  };
}

export function getAddonOrderLabel(type: string, fallbackName: string) {
  if (type === "WATER_VESSEL") {
    return {
      title: "Vasilhame de água",
      subtitle:
        "Recipiente vazio. Adicione junto da água se o cliente ainda não tem o botijão.",
    };
  }

  if (type === "GAS_VESSEL") {
    return {
      title: "Vasilhame de gás",
      subtitle:
        "Botijão vazio. Adicione junto do gás se o cliente ainda não tem o recipiente.",
    };
  }

  return {
    title: fallbackName,
    subtitle: undefined,
  };
}
