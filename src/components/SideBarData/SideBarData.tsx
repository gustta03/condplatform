import * as Icon from 'phosphor-react'

export const SideBarData = [
  {
    type: "Gestão",
    title: "Aviso",
    icon: <Icon.Warning size={24}/>,
    link: "/avisos",
  },
  {
    title: "documentos",
    icon: <Icon.FileCloud size={24} />,
    link: "/documento",
  },
  {
    title: "Reservas",
    icon: <Icon.CalendarCheck size={24} />,
    link: "/reservas",
  },

  {
    title: "Ocorrencias",
    icon: <Icon.Bell size={24} />,
    link: "/ocorrencias",
  },
  {
    title: "Achados e perdidos",
    icon: <Icon.Binoculars size={24} />,
    link: "achados",
  },
  {
    type: "Dados",
    title: "úsuarios",
    icon: <Icon.Users size={24} />,
    link: "/usuarios",
  },
  {
    title: "Unidades",
    icon: <Icon.HouseSimple size={24} />,
    link: "/unidades",
  },
  {
    title: "Areas comuns",
    icon: <Icon.Clipboard size={24} />,
    link: "/areas",
  },
];
