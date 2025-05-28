import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, Container, 
  Card, CardContent, Grid, Paper, Tabs, Tab, 
  Avatar, IconButton, Badge, Divider, Chip,
  List, ListItem, ListItemAvatar, ListItemText,
  InputBase, useTheme, LinearProgress, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow, Button
} from '@mui/material';
import {
  Dashboard, DirectionsCar, People, Payment, Settings,
  Notifications, Search, Menu, ArrowUpward, CheckCircle, 
  Pending, CalendarToday, MonetizationOn, LocalOffer,
  Star, StarHalf, StarBorder, AccessTime, DoneAll,
  TrendingUp, MoreVert, ChevronRight
} from '@mui/icons-material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';

const AdminDashboard = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const dashboardData = {
    stats: [
      { title: "Available Vehicles", value: 32, change: +5, icon: <DirectionsCar /> },
      { title: "Active Bookings", value: 18, change: +2, icon: <CalendarToday /> },
      { title: "Registered Users", value: 156, change: +12, icon: <People /> },
      { title: "Monthly Revenue", value: "$12,500", change: +8, icon: <MonetizationOn /> }
    ],
    bookings: [
      { id: 1, user: "John Doe", car: "Toyota Camry", date: "Jun 15-20", status: "active", amount: "$225" },
      { id: 2, user: "Jane Smith", car: "BMW X5", date: "Jun 18-25", status: "completed", amount: "$840" },
      { id: 3, user: "Mike Johnson", car: "Mercedes E-Class", date: "Jul 1-5", status: "upcoming", amount: "$600" },
      { id: 4, user: "Sarah Williams", car: "Honda Civic", date: "Jul 5-10", status: "completed", amount: "$350" },
      { id: 5, user: "David Brown", car: "Audi Q7", date: "Jul 12-20", status: "active", amount: "$1,200" }
    ],
    vehicleTypes: [
      { name: "Economy", value: 15, color: theme.palette.primary.main },
      { name: "Luxury", value: 8, color: theme.palette.secondary.main },
      { name: "SUV", value: 12, color: theme.palette.success.main },
      { name: "Van", value: 7, color: theme.palette.warning.main }
    ],
    monthlyData: [12, 19, 15, 22, 18, 25, 30, 27, 23, 19, 15, 20],
    revenueData: [4500, 6200, 5800, 7100, 6900, 8500, 9200, 8800, 8200, 7500, 6800, 8000],
    popularCars: [
      { name: "Toyota Camry", bookings: 42, rating: 4.5 },
      { name: "BMW X5", bookings: 38, rating: 4.8 },
      { name: "Honda Civic", bookings: 35, rating: 4.2 },
      { name: "Mercedes E-Class", bookings: 28, rating: 4.7 },
      { name: "Audi Q7", bookings: 25, rating: 4.6 }
    ],
    recentUsers: [
      { name: "John Doe", joinDate: "Jun 12, 2023", bookings: 5, avatar: "JD" },
      { name: "Jane Smith", joinDate: "May 28, 2023", bookings: 3, avatar: "JS" },
      { name: "Mike Johnson", joinDate: "Jun 5, 2023", bookings: 2, avatar: "MJ" },
      { name: "Emily Davis", joinDate: "Jun 18, 2023", bookings: 1, avatar: "ED" }
    ]
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} sx={{ color: theme.palette.warning.main, fontSize: 16 }} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" sx={{ color: theme.palette.warning.main, fontSize: 16 }} />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorder key={`empty-${i}`} sx={{ color: theme.palette.warning.main, fontSize: 16 }} />);
    }
    
    return stars;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: theme.palette.grey[50] }}>
      {/* Header */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ px: { xs: 2, md: 4 }, height: 80 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <DirectionsCar sx={{ 
              color: 'primary.main', 
              fontSize: 32,
              mr: 2 
            }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              CAR RENTAL ADMIN
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: { xs: 1, sm: 2 }
          }}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
            >
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <Search />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Paper>
            <IconButton size="large">
              <Badge badgeContent={4} color="error">
                <Notifications sx={{ color: 'text.secondary' }} />
              </Badge>
            </IconButton>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main',
                color: 'common.white',
                width: 40,
                height: 40
              }}
            >
              AD
            </Avatar>
          </Box>
        </Toolbar>
        
        {/* Navigation Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newVal) => setActiveTab(newVal)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            px: { xs: 2, md: 4 },
            '& .MuiTabs-indicator': {
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3
            }
          }}
        >
          <Tab label="Dashboard" icon={<Dashboard />} iconPosition="start" />
          <Tab label="Vehicles" icon={<DirectionsCar />} iconPosition="start" />
          <Tab label="Users" icon={<People />} iconPosition="start" />
          <Tab label="Bookings" icon={<CalendarToday />} iconPosition="start" />
          <Tab label="Payments" icon={<Payment />} iconPosition="start" />
          <Tab label="Settings" icon={<Settings />} iconPosition="start" />
        </Tabs>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardData.stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.50', 
                      color: 'primary.main',
                      mr: 2,
                      width: 48,
                      height: 48
                    }}>
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip 
                    size="small"
                    label={`${stat.change > 0 ? '+' : ''}${stat.change}%`}
                    icon={<ArrowUpward fontSize="small" />}
                    sx={{ 
                      bgcolor: 'success.50',
                      color: 'success.main',
                      fontSize: '0.75rem'
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Monthly Performance
                  </Typography>
                  <Button size="small" endIcon={<ChevronRight />}>
                    View Report
                  </Button>
                </Box>
                <Box sx={{ height: 300 }}>
                  <LineChart
                    series={[
                      { 
                        data: dashboardData.monthlyData,
                        label: 'Bookings',
                        color: theme.palette.primary.main
                      },
                      { 
                        data: dashboardData.revenueData.map(val => val / 300),
                        label: 'Revenue ($)',
                        color: theme.palette.success.main
                      }
                    ]}
                    xAxis={[{ 
                      scaleType: 'band', 
                      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    }]}
                    yAxis={[
                      { id: 'bookings', scaleType: 'linear' },
                      { id: 'revenue', scaleType: 'linear' }
                    ]}
                    margin={{ left: 50, right: 20, top: 20, bottom: 50 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 1, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Vehicle Distribution
                </Typography>
                <Box sx={{ height: 300 }}>
                  <PieChart
                    series={[{
                      data: dashboardData.vehicleTypes,
                      innerRadius: 40,
                      outerRadius: 100,
                      paddingAngle: 2,
                      cornerRadius: 4,
                    }]}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        itemMarkWidth: 10,
                        itemMarkHeight: 10,
                        labelStyle: { fontSize: '0.75rem' }
                      },
                    }}
                    margin={{ right: 120 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Grid container spacing={3}>
          {/* Recent Bookings */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Bookings
                  </Typography>
                  <Button size="small" endIcon={<ChevronRight />}>
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Car</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboardData.bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <Typography fontWeight="medium">{booking.car}</Typography>
                          </TableCell>
                          <TableCell>{booking.user}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>{booking.amount}</TableCell>
                          <TableCell>
                            <Chip 
                              label={booking.status}
                              size="small"
                              icon={
                                booking.status === 'completed' ? <DoneAll fontSize="small" /> :
                                booking.status === 'active' ? <AccessTime fontSize="small" /> : 
                                <Pending fontSize="small" />
                              }
                              sx={{
                                bgcolor: 
                                  booking.status === 'completed' ? 'success.50' :
                                  booking.status === 'active' ? 'warning.50' : 'info.50',
                                color: 
                                  booking.status === 'completed' ? 'success.main' :
                                  booking.status === 'active' ? 'warning.main' : 'info.main',
                                textTransform: 'capitalize',
                                fontSize: '0.75rem'
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <MoreVert />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Popular Cars & Recent Users */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={3} direction="column">
              {/* Popular Cars */}
              <Grid item>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, pb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Popular Vehicles
                      </Typography>
                    </Box>
                    <List sx={{ p: 0 }}>
                      {dashboardData.popularCars.map((car, index) => (
                        <React.Fragment key={car.name}>
                          <ListItem 
                            sx={{
                              px: 3,
                              py: 2,
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Box>
                              <Typography fontWeight="medium">{car.name}</Typography>
                              <Box display="flex" alignItems="center" mt={0.5}>
                                {renderRatingStars(car.rating)}
                                <Typography variant="caption" color="text.secondary" ml={1}>
                                  ({car.rating})
                                </Typography>
                              </Box>
                            </Box>
                            <Chip 
                              label={`${car.bookings} bookings`}
                              size="small"
                              sx={{
                                bgcolor: 'primary.50',
                                color: 'primary.main'
                              }}
                            />
                          </ListItem>
                          {index < dashboardData.popularCars.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Users */}
              <Grid item>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, pb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Recent Users
                      </Typography>
                    </Box>
                    <List sx={{ p: 0 }}>
                      {dashboardData.recentUsers.map((user, index) => (
                        <React.Fragment key={user.name}>
                          <ListItem sx={{ px: 3, py: 2 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white' }}>
                                {user.avatar}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={user.name}
                              secondary={`Joined ${user.joinDate} • ${user.bookings} bookings`}
                            />
                            <IconButton edge="end">
                              <ChevronRight />
                            </IconButton>
                          </ListItem>
                          {index < dashboardData.recentUsers.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;