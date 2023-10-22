import Location from './Location';

export function LocationsGrid() {
  return (
    <div className="flex gap-4 mt-8 flex-wrap">
      <Location link={'a'} />
      <Location link={'b'} />
      <Location link={'c'} />
      <Location link={'d'} />
    </div>
  );
}
