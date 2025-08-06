export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total API Calls</h3>
          </div>
          <div className="text-2xl font-bold">12,543</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Content Moderated</h3>
          </div>
          <div className="text-2xl font-bold">8,732</div>
          <p className="text-xs text-muted-foreground">+15.3% from last month</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Policies</h3>
          </div>
          <div className="text-2xl font-bold">23</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Flagged Content</h3>
          </div>
          <div className="text-2xl font-bold">342</div>
          <p className="text-xs text-muted-foreground">-5.2% from last month</p>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Content moderated: &quot;User comment blocked&quot;</span>
            <span className="text-xs text-muted-foreground">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">New policy created: &quot;Hate Speech Detection&quot;</span>
            <span className="text-xs text-muted-foreground">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">API key generated for new client</span>
            <span className="text-xs text-muted-foreground">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}