import 'App.css';
const TableLoader = ({ color }: { color?: string }) => {
  return (
    <div style={{ color: color }} className='lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default TableLoader;
