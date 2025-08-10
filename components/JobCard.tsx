export default function JobCard({ job }:{ job: { title:string, description:string, location?:string, date?:string, rate?:string } }){
  return (
    <div className="card p-4 space-y-2">
      <div className="text-lg font-semibold">{job.title}</div>
      <div className="text-sm text-gray-600">{job.location} • {job.date}</div>
      <p>{job.description}</p>
      {job.rate && <div className="text-sm">Rate: {job.rate}</div>}
      <button className="btn-primary">Apply</button>
    </div>
  )
}
