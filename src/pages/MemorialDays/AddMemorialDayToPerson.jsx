import { HDate } from '@hebcal/hdate';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/General/Spinner';
import AddToMemmorialDayTable from '../../components/MemorialDays/AddToMemmorialDayTable';
import { AddMemorialDay, GetEligblePeopleToMemmorialDay } from '../../requests/ApiRequests';


function AddMemorialDayToPerson() {
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const campainName = queryParams.get('CampainName');
    const date = queryParams.get('date');
    const [rowData, setRowData] = useState([]);
    const hebrewDateGematria = new HDate(new Date(date)).renderGematriya()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [memorialDay, setMemorialDay] = useState({
        Commeration: "",
        date: new Date(date),
        hebrewDate: hebrewDateGematria
    })
    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const response = await GetEligblePeopleToMemmorialDay(campainName);
            console.log(response);
            setRowData(response.data.data.people ||[]);
      
          } catch (error) {
            console.error(error);
          }
          finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }, []);
    
     function handelCommartionChange(e)
     {
        const { name, value } = e.target;
        setMemorialDay(prevMemorialDay => ({
          ...prevMemorialDay,
          [name]: value
        }));
     }

     async function AddMemorialDayFunc(AnashIdentifier)
     {
      const data = {AnashIdentifier: AnashIdentifier, CampainName: campainName, MemorialDay: memorialDay}
      
      try {
        setIsLoading(true);
        const response = await AddMemorialDay(data);

        if (response.status === 200) {
          toast.success('הנצחה נוספה בהצלחה', {
            autoClose: 1000,
          });
          navigate(`/memorial-day-details?CampainName=${data.CampainName}&date=${data.MemorialDay.date}
            &anashidentifier=${data.AnashIdentifier}&commartion=${data.MemorialDay.Commeration||""}` )
            setIsLoading(false);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          autoClose: 1000,
        });
      }
      finally {
        setIsLoading(false);
      }

     }
     if(isLoading)
     {
      return <Spinner />
     }
    
    return (
      <div className="flex justify-around w-full mt-10">
        <div>{rowData && <AddToMemmorialDayTable rowData={rowData} onAddMemorialDayToPerson={AddMemorialDayFunc} />}</div>
        <div className='flex flex-col gap-[30px]'>
          <div>
              <p className="text-2xl border-b-2">תאריך יום הנצחה</p>
              <p className="text-3xl border-b-2 font-bold text-blue-500">
                {hebrewDateGematria}
              </p>
          </div>
          <textarea
          
          placeholder='הנצחה'
            type="textarea"
            name="Commeration"
            value={memorialDay.Commeration || ""}
            onChange={(e) => handelCommartionChange( e)}
            className="border border-gray-300 rounded"
          >

          </textarea>
        </div>
      </div>
    );
}

export default AddMemorialDayToPerson