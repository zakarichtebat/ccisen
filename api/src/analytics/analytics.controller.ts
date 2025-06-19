import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard analytics data' })
  @ApiQuery({ name: 'period', required: false, type: Number, description: 'Period in days (7, 30, 90, 365)' })
  @ApiResponse({ status: 200, description: 'Return dashboard analytics.' })
  async getDashboardAnalytics(@Query('period') period?: string) {
    const periodDays = period ? parseInt(period) : 30;
    return this.analyticsService.getDashboardAnalytics(periodDays);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get user analytics' })
  @ApiQuery({ name: 'period', required: false, type: Number, description: 'Period in days' })
  @ApiResponse({ status: 200, description: 'Return user analytics.' })
  async getUserAnalytics(@Query('period') period?: string) {
    const periodDays = period ? parseInt(period) : 30;
    return this.analyticsService.getUserAnalytics(periodDays);
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get activity analytics' })
  @ApiQuery({ name: 'period', required: false, type: Number, description: 'Period in days' })
  @ApiResponse({ status: 200, description: 'Return activity analytics.' })
  async getActivityAnalytics(@Query('period') period?: string) {
    const periodDays = period ? parseInt(period) : 7;
    return this.analyticsService.getActivityAnalytics(periodDays);
  }

  @Get('chart-data')
  @ApiOperation({ summary: 'Get chart data for dashboard' })
  @ApiQuery({ name: 'period', required: false, type: Number, description: 'Period in days' })
  @ApiResponse({ status: 200, description: 'Return chart data.' })
  async getChartData(@Query('period') period?: string) {
    const periodDays = period ? parseInt(period) : 7;
    return this.analyticsService.getChartData(periodDays);
  }

  @Get('real-time')
  @ApiOperation({ summary: 'Get real-time statistics' })
  @ApiResponse({ status: 200, description: 'Return real-time statistics.' })
  async getRealTimeStats() {
    return this.analyticsService.getRealTimeStats();
  }
} 