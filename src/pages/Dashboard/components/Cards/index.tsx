import { Card, CardMain } from "./styled";
import UpIcon from "../../../../assets/jpg/Vector.jpg";


export const Cards = () => {
  return (
    <CardMain>
      <Card>
        <p>Moradores</p>
           <div>
             135
             <img src={UpIcon} />
            {/* <GroupsIcon className="groupicon" /> */}
        </div>
      </Card>
      <Card>
           <p>Blocos</p>
               <div>
                  221
                 <img src={UpIcon} />
             </div>
      </Card>
      <Card>
        <p>Unidades</p>
        <div>
          143
          <img src={UpIcon} />
        </div>
      </Card>
      <Card>
        <p>Veiculos</p>
        <div>
          121
          <img src={UpIcon} />
        </div>
      </Card>
    </CardMain>
  );
};
