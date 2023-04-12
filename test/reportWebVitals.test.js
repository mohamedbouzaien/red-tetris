import reportWebVitals from '../src/client/reportWebVitals';

jest.mock('web-vitals', () => ({
    getCLS: jest.fn(),
    getFID: jest.fn(),
    getFCP: jest.fn(),
    getLCP: jest.fn(),
    getTTFB: jest.fn()
}));

describe('reportWebVitals', () => {
    const mockOnPerfEntry = jest.fn();

    it('calls all web-vitals functions', async () => {
        await reportWebVitals(mockOnPerfEntry);
        setTimeout(() => {
            expect(mockOnPerfEntry).toHaveBeenCalledTimes(1);
            expect(mockOnPerfEntry).toHaveBeenCalledWith({
                name: 'CLS',
                value: expect.any(Number),
                entries: expect.any(Array)
            });
            expect(mockOnPerfEntry).toHaveBeenCalledWith({
            name: 'FID',
            value: expect.any(Number),
            entries: expect.any(Array)
            });
            expect(mockOnPerfEntry).toHaveBeenCalledWith({
                name: 'FCP',
                value: expect.any(Number),
                entries: expect.any(Array)
            });
            expect(mockOnPerfEntry).toHaveBeenCalledWith({
                name: 'LCP',
                value: expect.any(Number),
                entries: expect.any(Array)
            });
            expect(mockOnPerfEntry).toHaveBeenCalledWith({
                name: 'TTFB',
                value: expect.any(Number),
                entries: expect.any(Array)
            });
            done();
          }, 1000);
    });
});